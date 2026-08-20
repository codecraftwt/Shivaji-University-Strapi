import type { Core } from '@strapi/strapi';
import mainNav from './main-nav.json';
import seedData from './seed-data.json';

interface NavNode {
  label: string;
  href: string;
  children: NavNode[];
}

const HEADER_UID = 'api::header.header';
const FOOTER_UID = 'api::footer.footer';
const NAV_ITEM_UID = 'api::nav-item.nav-item' as any;
const MAIN_NAVBAR_UID = 'api::main-navbar.main-navbar' as any;
const PAGE_UID = 'api::page.page';
const QUICK_LINKS_UID = 'api::quick-links-section.quick-links-section';
const TOP_UTILITY_BAR_UID = 'api::top-utility-bar.top-utility-bar' as any;

const COLLECTION_UIDS: string[] = [] as any;

const SINGLE_UIDS = [HEADER_UID, FOOTER_UID, MAIN_NAVBAR_UID, QUICK_LINKS_UID, TOP_UTILITY_BAR_UID] as const;

const ensurePublicReadPermissions = async (strapi: Core.Strapi) => {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) {
    return;
  }

  const actions = [
    ...COLLECTION_UIDS.map((uid) => [`${uid}.find`, `${uid}.findOne`]),
    ...SINGLE_UIDS.map((uid) => [`${uid}.find`]),
    ...[
      `${NAV_ITEM_UID}.find`,
      `${NAV_ITEM_UID}.findOne`,
      `${PAGE_UID}.find`,
      `${PAGE_UID}.findOne`,
    ],
  ].flat();

  for (const action of actions) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });
    if (existing) {
      continue;
    }
    await strapi.db
      .query('plugin::users-permissions.permission')
      .create({ data: { action, role: publicRole.id } });
  }
};

const ensureSingle = async (strapi: Core.Strapi, uid: any, data: any) => {
  const existing = await strapi.documents(uid).findFirst({});
  if (existing) {
    await strapi.documents(uid).update({ documentId: existing.documentId, data });
    return;
  }
  await strapi.documents(uid).create({ data });
};

const seedCollection = async (
  strapi: Core.Strapi,
  uid: any,
  entries: any[],
  matchKey = 'title'
) => {
  const existingRows = await strapi.db.query(uid).findMany({ select: [matchKey] });
  const existingValues = new Set(
    existingRows.map((row: any) => row[matchKey]).filter((v: any) => v != null)
  );

  for (const entry of entries) {
    const key = entry[matchKey];
    if (key != null && existingValues.has(key)) {
      continue;
    }
    await strapi.documents(uid).create({ data: entry, status: 'published' });
  }
};

const seedNavItems = async (strapi: Core.Strapi) => {
  const existing = await strapi.documents(NAV_ITEM_UID).findFirst({});
  if (existing) {
    return;
  }

  const createNode = async (node: NavNode, parentDocumentId: string | null, order: number) => {
    const doc = await strapi.documents(NAV_ITEM_UID).create({
      data: {
        label: node.label,
        href: node.href,
        order,
        parent: parentDocumentId ? { set: [parentDocumentId] } : null,
      },
    });

    for (let i = 0; i < node.children.length; i += 1) {
      await createNode(node.children[i], doc.documentId, i);
    }
  };

  for (let i = 0; i < mainNav.length; i += 1) {
    await createNode(mainNav[i], null, i);
  }
};

const seedMainNavbar = async (strapi: Core.Strapi) => {
  const existing = await strapi.documents(MAIN_NAVBAR_UID).findFirst({});
  if (existing) {
    return;
  }

  const menuItems = mainNav.map((node) => ({
    label: node.label,
    href: node.href,
    dropdown_items: node.children.map((child) => ({
      label: child.label,
      href: child.href,
      sub_items: child.children.map((sub) => ({
        label: sub.label,
        href: sub.href,
      })),
    })),
  }));

  await strapi.documents(MAIN_NAVBAR_UID).create({
    data: { menu_items: menuItems },
  });
};

const QUICK_LINKS = [
  { title: "NIRF", iconName: "ChartBarIcon", url: "#" },
  { title: "AIU", iconName: "GlobeAltIcon", url: "#" },
  { title: "National Education Policy", iconName: "BookOpenIcon", url: "#" },
  { title: "Our Programs", iconName: "AcademicCapIcon", url: "#" },
  { title: "IT Services", iconName: "ComputerDesktopIcon", url: "#" },
  { title: "Examinations", iconName: "DocumentCheckIcon", url: "#" },
  { title: "Student Design Center", iconName: "LightBulbIcon", url: "#" },
  { title: "Vice Chancellor", iconName: "UserGroupIcon", url: "#" }
];

const buildHomeSections = (data: any) => [
  {
    __component: 'sections.quick-links',
    links: QUICK_LINKS,
  },
  {
    __component: 'sections.departments-leadership',
    departments: data.departments.map((d: any) => ({ name: d.name, link: d.link })),
    leadership: data.leadership.map((l: any) => ({ name: l.name, title: l.title })),
  },
  {
    __component: 'sections.announcements-ticker',
    announcements: data.announcements,
  },
  {
    __component: 'sections.updates-events-achievements',
    updates: data.updates,
    events: data.events,
    achievements: data.achievements,
  },
  {
    __component: 'sections.circulars',
    circulars: data.circulars,
  },
  {
    __component: 'sections.important-links-stats',
    importantLinks: data.importantLinks.map((l: any) => ({
      name: l.name,
      url: l.url,
      imageUrl: l.imageUrl,
    })),
    stats: data.stats,
  },
  {
    __component: 'sections.documentary-videos',
    videos: data.videos,
  },
  {
    __component: 'sections.partner-logos',
    partners: data.partners.map((p: any) => ({ name: p.name, url: p.url })),
  },
];


const ensureHomeSections = async (strapi: Core.Strapi) => {
  const page = await strapi.documents(PAGE_UID).findFirst({
    filters: { slug: 'home' },
    populate: ['sections'],
  });
  if (!page) {
    return;
  }

  const existing = (page.sections || []) as any[];
  const existingTypes = new Set(existing.map((s) => s.__component));
  const missing = buildHomeSections(seedData).filter(
    (s) => !existingTypes.has(s.__component)
  );

  if (missing.length === 0) {
    return;
  }

  await strapi.documents(PAGE_UID).update({
    documentId: page.documentId,
    data: { sections: [...existing, ...missing] },
    status: 'published',
  });
};

const syncHomeDepartments = async (strapi: Core.Strapi) => {
  const page = await strapi.documents(PAGE_UID).findFirst({
    filters: { slug: 'home' },
    populate: ['sections'],
  });
  if (!page) {
    return;
  }

  const sections = (page.sections || []) as any[];
  const target = sections.find(
    (s) => s.__component === 'sections.departments-leadership'
  );
  if (!target) {
    return;
  }

  const departments = seedData.departments.map((d: any) => ({
    name: d.name,
    link: d.link,
  }));

  const existingDepartments = (target.departments || []) as any[];
  const fullyLinked =
    existingDepartments.length > 0 &&
    existingDepartments.every((d: any) => d && d.link);
  if (fullyLinked && existingDepartments.length === departments.length) {
    return;
  }

  const updated = sections.map((s) =>
    s.__component === 'sections.departments-leadership'
      ? { ...s, departments }
      : s
  );

  await strapi.documents(PAGE_UID).update({
    documentId: page.documentId,
    data: { sections: updated },
    status: 'published',
  });
};

const syncHomeImportantLinks = async (strapi: Core.Strapi) => {
  const page = await strapi.documents(PAGE_UID).findFirst({
    filters: { slug: 'home' },
    populate: ['sections'],
  });
  if (!page) {
    return;
  }

  const sections = (page.sections || []) as any[];
  const target = sections.find(
    (s) => s.__component === 'sections.important-links-stats'
  );
  if (!target) {
    return;
  }

  const importantLinks = seedData.importantLinks.map((l: any) => ({
    name: l.name,
    url: l.url,
    imageUrl: l.imageUrl,
  }));
  const stats = seedData.stats;

  const current = (target.importantLinks || []) as any[];
  const hasImages =
    current.length > 0 && current.every((l: any) => l && l.imageUrl);
  if (hasImages && current.length === importantLinks.length) {
    return;
  }

  const updated = sections.map((s) =>
    s.__component === 'sections.important-links-stats'
      ? { ...s, importantLinks, stats }
      : s
  );

  await strapi.documents(PAGE_UID).update({
    documentId: page.documentId,
    data: { sections: updated },
    status: 'published',
  });
};

const syncHomeUpdatesEventsAchievements = async (strapi: Core.Strapi) => {
  const page = await strapi.documents(PAGE_UID).findFirst({
    filters: { slug: 'home' },
    populate: ['sections'],
  });
  if (!page) {
    return;
  }

  const sections = (page.sections || []) as any[];
  const target = sections.find(
    (s) => s.__component === 'sections.updates-events-achievements'
  );
  if (!target) {
    return;
  }

  const hasItems =
    (target.updates || []).length > 0 ||
    (target.events || []).length > 0 ||
    (target.achievements || []).length > 0;
  if (hasItems) {
    return;
  }

  const updated = sections.map((s) =>
    s.__component === 'sections.updates-events-achievements'
      ? {
          ...s,
          updates: seedData.updates,
          events: seedData.events,
          achievements: seedData.achievements,
        }
      : s
  );

  await strapi.documents(PAGE_UID).update({
    documentId: page.documentId,
    data: { sections: updated },
    status: 'published',
  });
};

const seed = async (strapi: Core.Strapi) => {
  await ensurePublicReadPermissions(strapi);

  await ensureSingle(strapi, HEADER_UID, {
    instituteName: seedData.header.instituteName,
    phone: seedData.header.phone,
    email: seedData.header.email,
    searchPlaceholder: "Type & Hit Enter...",
    logoUrl: "https://inherent-duck.jurassic.ninja/wp-content/uploads/2024/10/uni_logo-1-2.webp",
    rightLogoUrl: "https://inherent-duck.jurassic.ninja/wp-content/uploads/2024/10/iso-g20-1.png",
  });

  await ensureSingle(strapi, QUICK_LINKS_UID, {
    links: QUICK_LINKS
  });

  await ensureSingle(strapi, FOOTER_UID, seedData.footer);
  await ensureSingle(strapi, TOP_UTILITY_BAR_UID, (seedData as any).topUtilityBar);

  await seedNavItems(strapi);
  await seedMainNavbar(strapi);

  // Deleted collections seeding removed

  await seedCollection(strapi, PAGE_UID, seedData.pages, 'slug');

  await ensureHomeSections(strapi);
  await syncHomeDepartments(strapi);
  await syncHomeImportantLinks(strapi);
  await syncHomeUpdatesEventsAchievements(strapi);
};

export default seed;
