import type { Schema, Struct } from '@strapi/strapi';

export interface FooterColumns extends Struct.ComponentSchema {
  collectionName: 'components_footer_columns';
  info: {
    description: '';
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'footer.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface FooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_links';
  info: {
    description: '';
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    description: '';
    displayName: 'Social Link';
    icon: 'globe';
  };
  attributes: {
    href: Schema.Attribute.String;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube']
    >;
  };
}

export interface MainNavbarDropdownItem extends Struct.ComponentSchema {
  collectionName: 'components_main_navbar_dropdown_items';
  info: {
    description: '';
    displayName: 'Dropdown Item';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    sub_items: Schema.Attribute.Component<'main-navbar.sub-item', true>;
  };
}

export interface MainNavbarMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_main_navbar_menu_items';
  info: {
    description: '';
    displayName: 'Menu Item';
    icon: 'bulletList';
  };
  attributes: {
    dropdown_items: Schema.Attribute.Component<
      'main-navbar.dropdown-item',
      true
    >;
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface MainNavbarSubItem extends Struct.ComponentSchema {
  collectionName: 'components_main_navbar_sub_items';
  info: {
    description: '';
    displayName: 'Sub Item';
    icon: 'bulletList';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SectionsAboutContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_contents';
  info: {
    description: '';
    displayName: 'About Content';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsAboutRit extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_rits';
  info: {
    description: '';
    displayName: 'About RIT';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsAnnouncementsTicker extends Struct.ComponentSchema {
  collectionName: 'components_sections_announcements_tickers';
  info: {
    description: '';
    displayName: 'Announcements Ticker';
    icon: 'bullhorn';
  };
  attributes: {
    announcements: Schema.Attribute.Component<'sections.ticker-item', true>;
  };
}

export interface SectionsCircular extends Struct.ComponentSchema {
  collectionName: 'components_sections_circular_items';
  info: {
    description: '';
    displayName: 'Circular Item';
    icon: 'filePdf';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'General Administration',
        'Affiliation',
        'Examination',
        'Finance',
        'Board of Research',
      ]
    >;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCirculars extends Struct.ComponentSchema {
  collectionName: 'components_sections_circulars';
  info: {
    description: '';
    displayName: 'Circulars';
    icon: 'file';
  };
  attributes: {
    circulars: Schema.Attribute.Component<'sections.circular', true>;
  };
}

export interface SectionsDepartment extends Struct.ComponentSchema {
  collectionName: 'components_sections_departments';
  info: {
    description: '';
    displayName: 'Department';
    icon: 'grid';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDepartmentsLeadership extends Struct.ComponentSchema {
  collectionName: 'components_sections_departments_leaderships';
  info: {
    description: '';
    displayName: 'Departments & Leadership';
    icon: 'school';
  };
  attributes: {
    departments: Schema.Attribute.Component<'sections.department', true>;
    leadership: Schema.Attribute.Component<'sections.leadership', true>;
  };
}

export interface SectionsDocumentaryVideos extends Struct.ComponentSchema {
  collectionName: 'components_sections_documentary_videos';
  info: {
    description: '';
    displayName: 'Documentary Videos';
    icon: 'play';
  };
  attributes: {
    videos: Schema.Attribute.Component<'sections.title-link', true>;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: '';
    displayName: 'hero-section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    heading: Schema.Attribute.Text;
    subheading: Schema.Attribute.String;
  };
}

export interface SectionsHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_slides';
  info: {
    description: '';
    displayName: 'Hero Slide';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsImportantLinksStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_important_links_stats';
  info: {
    description: '';
    displayName: 'Important Links & Stats';
    icon: 'chartBubble';
  };
  attributes: {
    importantLinks: Schema.Attribute.Component<'sections.link-item', true>;
    stats: Schema.Attribute.Component<'sections.stat', true>;
  };
}

export interface SectionsLeadership extends Struct.ComponentSchema {
  collectionName: 'components_sections_leaderships';
  info: {
    description: '';
    displayName: 'Leadership Member';
    icon: 'user';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_link_items';
  info: {
    description: '';
    displayName: 'Link Item';
    icon: 'link';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SectionsPartnerLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_logos';
  info: {
    description: '';
    displayName: 'Partner Logos';
    icon: 'grid';
  };
  attributes: {
    partners: Schema.Attribute.Component<'sections.link-item', true>;
  };
}

export interface SectionsQuickLinks extends Struct.ComponentSchema {
  collectionName: 'components_sections_quick_links';
  info: {
    description: '';
    displayName: 'Quick Links';
    icon: 'link';
  };
  attributes: {
    links: Schema.Attribute.Component<'utility.quick-link', true>;
  };
}

export interface SectionsStat extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    description: '';
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SectionsStatsCounter extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats_counters';
  info: {
    description: '';
    displayName: 'Stats Counter';
    icon: 'chartBubble';
  };
  attributes: {
    heading: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'sections.stat', true>;
  };
}

export interface SectionsTickerItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_ticker_items';
  info: {
    description: '';
    displayName: 'Ticker Item';
    icon: 'message';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTitleLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_title_links';
  info: {
    description: '';
    displayName: 'Title Link';
    icon: 'link';
  };
  attributes: {
    date: Schema.Attribute.Date;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsUpdatesEventsAchievements
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_updates_events_achievements';
  info: {
    description: '';
    displayName: 'Updates, Events & Achievements';
    icon: 'chartBubble';
  };
  attributes: {
    achievements: Schema.Attribute.Component<'sections.title-link', true>;
    achievementsImage: Schema.Attribute.Media<'images'>;
    events: Schema.Attribute.Component<'sections.title-link', true>;
    eventsImage: Schema.Attribute.Media<'images'>;
    updates: Schema.Attribute.Component<'sections.title-link', true>;
    updatesImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_sections_vision_missions';
  info: {
    description: '';
    displayName: 'Vision Mission';
    icon: 'eye';
  };
  attributes: {
    missionImage: Schema.Attribute.Media<'images'>;
    missionText: Schema.Attribute.Text;
    visionImage: Schema.Attribute.Media<'images'>;
    visionText: Schema.Attribute.Text;
  };
}

export interface UtilityLanguage extends Struct.ComponentSchema {
  collectionName: 'components_utility_languages';
  info: {
    displayName: 'Language';
    icon: 'globe';
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilityLink extends Struct.ComponentSchema {
  collectionName: 'components_utility_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['chevron-down', 'eye', 'phone', 'none']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilityQuickLink extends Struct.ComponentSchema {
  collectionName: 'components_utility_quick_links';
  info: {
    description: '';
    displayName: 'quick-link';
  };
  attributes: {
    iconName: Schema.Attribute.Enumeration<
      [
        'ChartBarIcon',
        'GlobeAltIcon',
        'BookOpenIcon',
        'AcademicCapIcon',
        'ComputerDesktopIcon',
        'DocumentCheckIcon',
        'LightBulbIcon',
        'UserGroupIcon',
        'LinkIcon',
        'ArrowRightIcon',
        'InformationCircleIcon',
        'BriefcaseIcon',
        'BuildingLibraryIcon',
        'CalendarIcon',
        'ClipboardDocumentListIcon',
        'SparklesIcon',
        'TrophyIcon',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'LinkIcon'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilitySocialLink extends Struct.ComponentSchema {
  collectionName: 'components_utility_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'share-alt';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'footer.columns': FooterColumns;
      'footer.link': FooterLink;
      'footer.social-link': FooterSocialLink;
      'main-navbar.dropdown-item': MainNavbarDropdownItem;
      'main-navbar.menu-item': MainNavbarMenuItem;
      'main-navbar.sub-item': MainNavbarSubItem;
      'sections.about-content': SectionsAboutContent;
      'sections.about-rit': SectionsAboutRit;
      'sections.announcements-ticker': SectionsAnnouncementsTicker;
      'sections.circular': SectionsCircular;
      'sections.circulars': SectionsCirculars;
      'sections.department': SectionsDepartment;
      'sections.departments-leadership': SectionsDepartmentsLeadership;
      'sections.documentary-videos': SectionsDocumentaryVideos;
      'sections.hero-section': SectionsHeroSection;
      'sections.hero-slide': SectionsHeroSlide;
      'sections.important-links-stats': SectionsImportantLinksStats;
      'sections.leadership': SectionsLeadership;
      'sections.link-item': SectionsLinkItem;
      'sections.partner-logos': SectionsPartnerLogos;
      'sections.quick-links': SectionsQuickLinks;
      'sections.stat': SectionsStat;
      'sections.stats-counter': SectionsStatsCounter;
      'sections.ticker-item': SectionsTickerItem;
      'sections.title-link': SectionsTitleLink;
      'sections.updates-events-achievements': SectionsUpdatesEventsAchievements;
      'sections.vision-mission': SectionsVisionMission;
      'utility.language': UtilityLanguage;
      'utility.link': UtilityLink;
      'utility.quick-link': UtilityQuickLink;
      'utility.social-link': UtilitySocialLink;
    }
  }
}
