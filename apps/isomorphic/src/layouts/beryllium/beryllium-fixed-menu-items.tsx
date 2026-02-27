import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import { IconType } from 'react-icons/lib';

import { atom } from 'jotai';
import {
  PiAirplaneTilt,
  PiApplePodcastsLogo,
  PiBellSimpleRinging,
  PiBinoculars,
  PiBriefcase,
  PiBriefcaseDuotone,
  PiCalendar,
  PiCalendarPlus,
  PiCalendarPlusDuotone,
  PiCards,
  PiChartBar,
  PiChartLineUp,
  PiChartLineUpDuotone,
  PiChartPieSlice,
  PiChartPieSliceDuotone,
  PiChatCenteredDots,
  PiClipboardText,
  PiClipboardTextDuotone,
  PiCodesandboxLogo,
  PiCreditCard,
  PiCurrencyCircleDollar,
  PiCurrencyDollar,
  PiEnvelopeSimpleOpen,
  PiFeather,
  PiFile,
  PiFileImage,
  PiFolder,
  PiFolderLock,
  PiFolderUser,
  PiFolderUserDuotone,
  PiGridFour,
  PiHammer,
  PiHeadset,
  PiHouse,
  PiHouseLine,
  PiLightning,
  PiListChecksDuotone,
  PiLockKey,
  PiMagicWand,
  PiMapPinLine,
  PiNewspaperClipping,
  PiNewspaperClippingDuotone,
  PiNoteBlank,
  PiNotePencil,
  PiPackage,
  PiPackageDuotone,
  PiPokerChip,
  PiPresentationChart,
  PiPrinterDuotone,
  PiRocketLaunch,
  PiScales,
  PiShapes,
  PiShapesDuotone,
  PiShieldCheck,
  PiShieldCheckered,
  PiShootingStar,
  PiShoppingCart,
  PiSparkle,
  PiSquaresFour,
  PiStairs,
  PiSteps,
  PiTable,
  PiUser,
  PiUserCircle,
  PiUserCircleGearDuotone,
  PiUserGear,
  PiUserPlus,
  PiUsersDuotone,
} from 'react-icons/pi';
import { AiTwotoneFileText } from 'react-icons/ai';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
  roles?: string[] | null;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
  roles?: string[] | null | undefined;
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
  roles?: string[] | null | undefined;
  isExpnad?: boolean;
}

export const berylliumMenuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'Home',
    title: 'Overview',
    icon: PiHouse,
    roles: [
      'superAdmin',
      'pnpAdmin',
      'eventAdmin',
      'financeExecutive',
      'financeManager',
      'financeHead',
      'eventHead',
      'operationHead',
      'eventUser',
      'csUser',
    ],
    isExpnad: false,
    menuItems: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: PiChartPieSliceDuotone,
        roles: [
          'superAdmin',
          'pnpAdmin',
          'eventAdmin',
          'financeExecutive',
          'financeManager',
          'financeHead',
          'eventHead',
          'operationHead',
          'eventUser',
          'csUser',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'User',
    title: 'Overview',
    icon: PiUser,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'User Types',
        description: 'Types Of user in diffrent teams',
        icon: PiUsersDuotone,
        roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
        subMenuItems: [
          {
            name: 'Event Team Users',
            href: routes.usertypes.event,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
          {
            name: 'P&P Team Users',
            href: routes.usertypes.pnp,
            badge: '',
            roles: ['superAdmin', 'pnpAdmin'],
          },
          {
            name: 'Finance Team Users',
            href: routes.usertypes.finance,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
        ],
      },
      {
        name: 'User Management',
        href: routes.userManagement.users,
        icon: PiUserCircleGearDuotone,
        roles: ['superAdmin'],
      },
    ],
  },
  {
    id: '3',
    name: 'Vendor',
    title: 'Vendor Management',
    icon: PiPackageDuotone,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'Vendor Management',
        description: 'Types Of vendor in diffrent teams',
        icon: PiPackageDuotone,
        roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
        subMenuItems: [
          {
            name: 'PNP Vendors',
            href: routes.vendorManagement.pnp,
            badge: '',
            roles: ['superAdmin', 'pnpAdmin'],
          },
          {
            name: 'Event Vendors',
            href: routes.vendorManagement.event,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Client',
    title: 'Client Management',
    icon: PiBriefcaseDuotone,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'Client Management',
        description: 'Types Of client in diffrent teams',
        icon: PiBriefcaseDuotone,
        roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
        subMenuItems: [
          {
            name: 'PNP Clients',
            href: routes.clientManagement.pnp,
            badge: '',
            roles: ['superAdmin', 'pnpAdmin'],
          },
          {
            name: 'Event Clients',
            href: routes.clientManagement.event,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'PNP',
    title: 'PNP Master',
    icon: PiFolderUserDuotone,
    roles: ['superAdmin', 'pnpAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'PNP Master',
        description: 'Master pages for PNP',
        icon: PiFolderUserDuotone,
        roles: ['superAdmin', 'pnpAdmin'],

        subMenuItems: [
          {
            name: 'HSN Code',
            href: routes.pnpMaster.hsn,
            badge: '',
          },
          {
            name: 'Division Code and CC',
            href: routes.pnpMaster.division,
            badge: '',
          },
          {
            name: 'Delivery Location',
            href: routes.pnpMaster.delivery,
            badge: '',
          },
          {
            name: 'GL Code',
            href: routes.pnpMaster.gl,
            badge: '',
          },
          {
            name: 'Job Types',
            href: routes.pnpMaster.job,
            badge: '',
          },
        ],
      },
    ],
  },
  {
    id: '7',
    name: 'Job',
    title: 'Job Management',
    icon: PiShapesDuotone,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'Job Management',
        description: 'Master pages for Jobs',
        icon: PiShapesDuotone,
        roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
        subMenuItems: [
          {
            name: 'Event Jobs',
            href: routes.jobManagement.event,
            badge: '',
            roles: ['superAdmin', 'pnpAdmin'],
          },
          {
            name: 'PNP Jobs',
            href: routes.jobManagement.pnp,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
        ],
      },
    ],
  },
  {
    id: '8',
    name: 'Reports',
    title: 'Reports',
    icon: PiChartLineUpDuotone,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    isExpnad: true,
    menuItems: [
      {
        name: 'Reports',
        description: 'Repoorts',
        icon: PiChartLineUpDuotone,
        roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
        subMenuItems: [
          {
            name: 'Event Reports',
            href: routes.reports.event,
            badge: '',
            roles: ['superAdmin', 'eventAdmin'],
          },
          {
            name: 'PNP Reports',
            href: routes.reports.pnp,
            badge: '',
            roles: ['superAdmin', 'pnpAdmin'],
          },
        ],
      },
    ],
  },
  {
    id: '9a',
    name: 'Events',
    title: 'Events',
    icon: PiFolderUserDuotone,
    roles: ['eventUser', 'operationHead', 'eventHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Event Management',
        href: routes.eventManagement.event,
        icon: PiCalendarPlusDuotone,
        roles: ['eventUser', 'operationHead', 'eventHead'],
      },
    ],
  },
  {
    id: '9b',
    name: 'Approvals',
    title: 'Events Approve',
    icon: PiClipboardTextDuotone,
    roles: ['eventUser', 'operationHead', 'eventHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Event Approve',
        href: routes.eventManagement.eventApprove,
        icon: PiClipboardTextDuotone,
        roles: ['eventUser', 'operationHead', 'eventHead'],
      },
    ],
  },
  {
    id: '9c',
    name: 'Tracks',
    title: 'Events Tracker',
    icon: PiListChecksDuotone,
    roles: ['eventUser', 'operationHead', 'eventHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Event Tracker',
        href: routes.eventManagement.eventTracker,
        icon: PiListChecksDuotone,
        roles: ['eventUser', 'operationHead', 'eventHead'],
      },
    ],
  },
  {
    id: '10',
    name: 'Client',
    title: 'Client',
    icon: PiFolderUserDuotone,
    roles: ['eventUser', 'operationHead', 'eventHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Client Approval',
        href: routes.eventManagement.client,
        icon: PiNewspaperClippingDuotone,
        roles: ['eventUser', 'operationHead', 'eventHead'],
      },
    ],
  },
  {
    id: '11',
    name: 'PO',
    title: 'PO',
    icon: PiClipboardTextDuotone,
    roles: ['financeExecutive', 'financeManager', 'financeHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'PO Management',
        href: routes.POManagement.po,
        icon: PiClipboardTextDuotone,
        roles: ['financeExecutive', 'financeManager', 'financeHead'],
      },
    ],
  },
  {
    id: '12',
    name: 'Invoice',
    title: 'Invoice',
    icon: AiTwotoneFileText,
    roles: ['financeExecutive', 'financeManager', 'financeHead'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Invoice Management',
        href: routes.InvoiceManagement.invoice,
        icon: AiTwotoneFileText,
        roles: ['financeExecutive', 'financeManager', 'financeHead'],
      },
    ],
  },
  {
    id: '13',
    name: 'JOB',
    title: 'JOB',
    icon: PiPrinterDuotone,
    roles: ['csUser'],
    isExpnad: false,
    menuItems: [
      {
        name: 'JOB Management',
        href: routes.jobManagement.job,
        icon: PiPrinterDuotone,
        roles: ['csUser'],
      },
    ],
  },
  {
    id: '14',
    name: 'Tracker',
    title: 'Tracker',
    icon: PiListChecksDuotone,
    roles: ['csUser'],
    isExpnad: false,
    menuItems: [
      {
        name: 'JOB Tracker',
        href: routes.jobManagement.tracker,
        icon: PiListChecksDuotone,
        roles: ['csUser'],
      },
    ],
  },
  {
    id: '15',
    name: 'Inquiry',
    title: 'inquiry',
    icon: PiFile,
    roles: ['csUser'],
    isExpnad: false,
    menuItems: [
      {
        name: 'Inquiry Management',
        href: routes.inquiryManagement.inquiry,
        icon: PiFile,
        roles: ['csUser'],
      },
    ],
  },

  // *******************old******************** //
  // {
  //   id: '2',
  //   name: 'Apps',
  //   title: 'Apps Kit',
  //   icon: PiLightning,
  //   menuItems: [
  //     {
  //       name: 'E-Commerce',
  //       description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
  //       icon: PiShoppingCart,
  //       subMenuItems: [
  //         {
  //           name: 'Products',
  //           href: routes.eCommerce.products,
  //           badge: '',
  //         },
  //         {
  //           name: 'Product Details',
  //           href: routes.eCommerce.productDetails(DUMMY_ID),
  //           badge: '',
  //         },
  //         {
  //           name: 'Create Product',
  //           href: routes.eCommerce.createProduct,
  //         },
  //         {
  //           name: 'Edit Product',
  //           href: routes.eCommerce.ediProduct(DUMMY_ID),
  //         },
  //         {
  //           name: 'Categories',
  //           href: routes.eCommerce.categories,
  //         },
  //         {
  //           name: 'Create Category',
  //           href: routes.eCommerce.createCategory,
  //         },
  //         {
  //           name: 'Edit Category',
  //           href: routes.eCommerce.editCategory(DUMMY_ID),
  //         },
  //         {
  //           name: 'Orders',
  //           href: routes.eCommerce.orders,
  //         },
  //         {
  //           name: 'Order Details',
  //           href: routes.eCommerce.orderDetails(DUMMY_ID),
  //         },
  //         {
  //           name: 'Create Order',
  //           href: routes.eCommerce.createOrder,
  //         },
  //         {
  //           name: 'Edit Order',
  //           href: routes.eCommerce.editOrder(DUMMY_ID),
  //         },
  //         {
  //           name: 'Reviews',
  //           href: routes.eCommerce.reviews,
  //         },
  //         {
  //           name: 'Shop',
  //           href: routes.eCommerce.shop,
  //         },
  //         {
  //           name: 'Cart',
  //           href: routes.eCommerce.cart,
  //         },
  //         {
  //           name: 'Checkout & Payment',
  //           href: routes.eCommerce.checkout,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Support',
  //       description: '"Effortless Assistance at your Fingertips!"',
  //       icon: PiHeadset,
  //       subMenuItems: [
  //         {
  //           name: 'Inbox',
  //           href: routes.support.inbox,
  //         },
  //         {
  //           name: 'Snippets',
  //           href: routes.support.snippets,
  //         },
  //         {
  //           name: 'Templates',
  //           href: routes.support.templates,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Invoice',
  //       description: 'Professional-looking invoices for each customer order',
  //       icon: PiCurrencyDollar,
  //       subMenuItems: [
  //         {
  //           name: 'List',
  //           href: routes.invoice.home,
  //         },
  //         {
  //           name: 'Details',
  //           href: routes.invoice.details(DUMMY_ID),
  //         },
  //         {
  //           name: 'Create',
  //           href: routes.invoice.create,
  //         },
  //         {
  //           name: 'Edit',
  //           href: routes.invoice.edit(DUMMY_ID),
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Logistics',
  //       description:
  //         '"Streamline Shipments: Discover Efficiency with our Logistics!"',
  //       icon: PiPackage,
  //       subMenuItems: [
  //         {
  //           name: 'Shipment List',
  //           href: routes.logistics.shipmentList,
  //         },
  //         {
  //           name: 'Shipment Details',
  //           href: routes.logistics.shipmentDetails(DUMMY_ID),
  //         },
  //         {
  //           name: 'Create Shipment',
  //           href: routes.logistics.createShipment,
  //         },
  //         {
  //           name: 'Edit Shipment',
  //           href: routes.logistics.editShipment(DUMMY_ID),
  //         },
  //         {
  //           name: 'Customer Profile',
  //           href: routes.logistics.customerProfile,
  //         },
  //         {
  //           name: 'Tracking',
  //           href: routes.logistics.tracking(DUMMY_ID),
  //         },
  //       ],
  //     },
  //     {
  //       name: 'File Manager',
  //       description:
  //         '"Organize, Access, and Share: Simplify your Digital World with us!"',
  //       icon: PiFileImage,
  //       subMenuItems: [
  //         {
  //           name: 'Files',
  //           href: routes.file.dashboard,
  //         },
  //         {
  //           name: 'Manage Files',
  //           href: routes.file.manager,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Job Feeds',
  //       href: routes.jobBoard.jobFeed,
  //       icon: PiShapes,
  //     },
  //     {
  //       name: 'Appointment',
  //       href: routes.appointment.appointmentList,
  //       icon: PiCalendar,
  //     },
  //     {
  //       name: 'Event Calendar',
  //       href: routes.eventCalendar,
  //       icon: PiCalendarPlus,
  //     },
  //     {
  //       name: 'Roles & Permissions',
  //       href: routes.rolesPermissions,
  //       icon: PiFolderLock,
  //     },
  //     {
  //       name: 'Point of Sell',
  //       href: routes.pos.index,
  //       icon: PiCreditCard,
  //     },
  //     {
  //       name: 'Invoice Builder',
  //       href: routes.invoice.builder,
  //       icon: PiNewspaperClipping,
  //     },
  //     {
  //       name: 'Image Viewer',
  //       href: routes.imageViewer,
  //       icon: PiCodesandboxLogo,
  //     },
  //   ],
  // },
  // {
  //   id: '3',
  //   name: 'Search',
  //   title: 'Search & Filter',
  //   icon: PiUserCircle,
  //   menuItems: [
  //     {
  //       name: 'Real Estate',
  //       href: routes.searchAndFilter.realEstate,
  //       icon: PiHouseLine,
  //       badge: '',
  //     },
  //     {
  //       name: 'Flight Booking',
  //       href: routes.searchAndFilter.flight,
  //       icon: PiAirplaneTilt,
  //     },
  //     {
  //       name: 'NFT',
  //       href: routes.searchAndFilter.nft,
  //       icon: PiPokerChip,
  //       badge: '',
  //     },
  //   ],
  // },
  // {
  //   id: '4',
  //   name: 'Widgets',
  //   title: 'Widgets',
  //   icon: PiPackage,
  //   menuItems: [
  //     {
  //       name: 'Cards',
  //       href: routes.widgets.cards,
  //       icon: PiSquaresFour,
  //     },
  //     {
  //       name: 'Icons',
  //       href: routes.widgets.icons,
  //       icon: PiFeather,
  //     },
  //     {
  //       name: 'Charts',
  //       href: routes.widgets.charts,
  //       icon: PiChartLineUp,
  //     },
  //     {
  //       name: 'Maps',
  //       href: routes.widgets.maps,
  //       icon: PiMapPinLine,
  //     },
  //   ],
  // },
  // {
  //   id: '5',
  //   name: 'Forms',
  //   title: 'Forms',
  //   icon: PiNotePencil,
  //   menuItems: [
  //     {
  //       name: 'Account Settings',
  //       href: routes.forms.profileSettings,
  //       icon: PiUserGear,
  //     },
  //     {
  //       name: 'Notification Preference',
  //       href: routes.forms.notificationPreference,
  //       icon: PiBellSimpleRinging,
  //     },
  //     {
  //       name: 'Personal Information',
  //       href: routes.forms.personalInformation,
  //       icon: PiUser,
  //     },
  //     {
  //       name: 'Newsletter',
  //       href: routes.forms.newsletter,
  //       icon: PiEnvelopeSimpleOpen,
  //     },
  //     {
  //       name: 'Multi Step',
  //       href: routes.multiStep,
  //       icon: PiSteps,
  //     },
  //     {
  //       name: 'Multi Step 2',
  //       href: routes.multiStep2,
  //       icon: PiStairs,
  //     },
  //     {
  //       name: 'Payment Checkout',
  //       href: routes.eCommerce.checkout,
  //       icon: PiCreditCard,
  //     },
  //   ],
  // },
  // {
  //   id: '6',
  //   name: 'Tables',
  //   title: 'Tables',
  //   icon: PiTable,
  //   menuItems: [
  //     {
  //       name: 'Tables',
  //       description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
  //       icon: PiGridFour,
  //       subMenuItems: [
  //         {
  //           name: 'Basic',
  //           href: routes.tables.basic,
  //         },
  //         {
  //           name: 'Collapsible',
  //           href: routes.tables.collapsible,
  //         },
  //         {
  //           name: 'Enhanced',
  //           href: routes.tables.enhanced,
  //         },
  //         {
  //           name: 'Sticky Header',
  //           href: routes.tables.stickyHeader,
  //         },
  //         {
  //           name: 'Pagination',
  //           href: routes.tables.pagination,
  //         },
  //         {
  //           name: 'Search',
  //           href: routes.tables.search,
  //         },
  //         {
  //           name: 'Resizable',
  //           href: routes.tables.resizable,
  //         },
  //         {
  //           name: 'Pinning',
  //           href: routes.tables.pinning,
  //         },
  //         {
  //           name: 'Drag & Drop',
  //           href: routes.tables.dnd,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: '7',
  //   name: 'Pages',
  //   title: 'Pages',
  //   icon: PiCards,
  //   menuItems: [
  //     {
  //       name: 'Profile',
  //       href: routes.profile,
  //       icon: PiMagicWand,
  //     },
  //     {
  //       name: 'Welcome',
  //       href: routes.welcome,
  //       icon: PiShootingStar,
  //     },
  //     {
  //       name: 'Coming Soon',
  //       href: routes.comingSoon,
  //       icon: PiRocketLaunch,
  //     },
  //     {
  //       name: 'Access Denied',
  //       href: routes.accessDenied,
  //       icon: PiFolderLock,
  //     },
  //     {
  //       name: 'Not Found',
  //       href: routes.notFound,
  //       icon: PiBinoculars,
  //     },
  //     {
  //       name: 'Maintenance',
  //       href: routes.maintenance,
  //       icon: PiHammer,
  //     },
  //     {
  //       name: 'Blank',
  //       href: routes.blank,
  //       icon: PiNoteBlank,
  //     },
  //   ],
  // },
  // {
  //   id: '8',
  //   name: 'Auth',
  //   title: 'Authentication',
  //   icon: PiShieldCheckered,
  //   menuItems: [
  //     {
  //       name: 'Sign Up',
  //       icon: PiUserPlus,
  //       description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
  //       subMenuItems: [
  //         {
  //           name: 'Modern Sign Up',
  //           href: routes.auth.signUp1,
  //         },
  //         {
  //           name: 'Vintage Sign Up',
  //           href: routes.auth.signUp2,
  //         },
  //         {
  //           name: 'Trendy Sign Up',
  //           href: routes.auth.signUp3,
  //         },
  //         {
  //           name: 'Elegant Sign Up',
  //           href: routes.auth.signUp4,
  //         },
  //         {
  //           name: 'Classic Sign Up',
  //           href: routes.auth.signUp5,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Sign In',
  //       icon: PiShieldCheck,
  //       description: '"Effortless Assistance at your Fingertips!"',
  //       subMenuItems: [
  //         {
  //           name: 'Modern Sign In',
  //           href: routes.auth.signIn1,
  //         },
  //         {
  //           name: 'Vintage Sign In',
  //           href: routes.auth.signIn2,
  //         },
  //         {
  //           name: 'Trendy Sign In',
  //           href: routes.auth.signIn3,
  //         },
  //         {
  //           name: 'Elegant Sign In',
  //           href: routes.auth.signIn4,
  //         },
  //         {
  //           name: 'Classic Sign In',
  //           href: routes.auth.signIn5,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Forgot Password',
  //       icon: PiLockKey,
  //       description:
  //         '"Streamline Shipments: Discover Efficiency with our Logistics!"',
  //       subMenuItems: [
  //         {
  //           name: 'Modern Forgot Password',
  //           href: routes.auth.forgotPassword1,
  //         },
  //         {
  //           name: 'Vintage Forgot Password',
  //           href: routes.auth.forgotPassword2,
  //         },
  //         {
  //           name: 'Trendy Forgot Password',
  //           href: routes.auth.forgotPassword3,
  //         },
  //         {
  //           name: 'Elegant Forgot Password',
  //           href: routes.auth.forgotPassword4,
  //         },
  //         {
  //           name: 'Classic Forgot Password',
  //           href: routes.auth.forgotPassword5,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'OTP Pages',
  //       icon: PiChatCenteredDots,
  //       description:
  //         '"Organize, Access, and Share: Simplify your Digital World with us!"',
  //       subMenuItems: [
  //         {
  //           name: 'Modern OTP Page',
  //           href: routes.auth.otp1,
  //         },
  //         {
  //           name: 'Vintage OTP Page',
  //           href: routes.auth.otp2,
  //         },
  //         {
  //           name: 'Trendy OTP Page',
  //           href: routes.auth.otp3,
  //         },
  //         {
  //           name: 'Elegant OTP Page',
  //           href: routes.auth.otp4,
  //         },
  //         {
  //           name: 'Classic OTP Page',
  //           href: routes.auth.otp5,
  //         },
  //       ],
  //     },
  //   ],
  // },
];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
