import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import {
  PiAirplaneTiltDuotone,
  PiApplePodcastsLogoDuotone,
  PiArrowsOutDuotone,
  PiArrowsOutLineHorizontalDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChartPieSliceDuotone,
  PiChatCenteredDotsDuotone,
  PiClipboardTextDuotone,
  PiCodesandboxLogoDuotone,
  PiCoinDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFolderDuotone,
  PiFolderLockDuotone,
  PiFoldersDuotone,
  PiFolderUserDuotone,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMapPinLineDuotone,
  PiNewspaperClippingDuotone,
  PiNoteBlankDuotone,
  PiPackageDuotone,
  PiPresentationChartDuotone,
  PiPushPinDuotone,
  PiRocketLaunchDuotone,
  PiScalesDuotone,
  PiShapesDuotone,
  PiShieldCheckDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSparkleDuotone,
  PiSquaresFourDuotone,
  PiStairsDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
  PiUserCircleGearDuotone,
  PiUsersDuotone,
  PiListChecksDuotone,
} from 'react-icons/pi';
import { AiTwotoneFileText } from 'react-icons/ai';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <PiChartPieSliceDuotone />,
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
    ],
    badge: '',
  },
  {
    name: 'User Types',
    href: '#',
    icon: <PiUsersDuotone />,
    roles: ['superAdmin', 'eventAdmin', 'pnpAdmin'],
    dropdownItems: [
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
    href: '#',
    icon: <PiUserCircleGearDuotone />,
    roles: ['superAdmin'],
    dropdownItems: [
      {
        name: 'User Event',
        href: routes.userManagement.users,
        badge: '',
        roles: ['superAdmin'],
      },
      {
        name: 'User PNP',
        href: routes.userManagement.usersPNP,
        badge: '',
        roles: ['superAdmin'],
      },
      {
        name: 'User Finance',
        href: routes.userManagement.usersFinance,
        badge: '',
        roles: ['superAdmin'],
      },
    ],
  },
  {
    name: 'Vendor Management',
    href: '#',
    icon: <PiPackageDuotone />,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    dropdownItems: [
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
  {
    name: 'Company Management',
    href: '#',
    icon: <PiBriefcaseDuotone />,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    dropdownItems: [
      {
        name: 'PNP Companies',
        href: routes.companyManagement.pnp,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
      {
        name: 'Company',
        href: routes.companyManagement.event,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'Division',
        href: routes.eventMaster.division,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'Client',
        href: routes.companyManagement.client,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
    ],
  },
  {
    name: 'PNP Master',
    href: '#',
    icon: <PiFolderUserDuotone />,
    roles: ['superAdmin', 'pnpAdmin'],
    dropdownItems: [
      {
        name: 'HSN Code',
        href: routes.pnpMaster.hsn,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
      {
        name: 'Division Code and CC',
        href: routes.pnpMaster.division,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
      {
        name: 'Delivery Location',
        href: routes.pnpMaster.delivery,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
      {
        name: 'GL Code',
        href: routes.pnpMaster.gl,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
      {
        name: 'Job Types',
        href: routes.pnpMaster.job,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
    ],
  },
  {
    name: 'Event Master',
    href: '#',
    icon: <PiFolderUserDuotone />,
    roles: ['superAdmin', 'eventAdmin'],
    dropdownItems: [
      {
        name: 'Project Categories',
        href: routes.eventMaster.project,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'Event Types',
        href: routes.eventMaster.type,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'Division Code and CC',
        href: routes.eventMaster.division,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'Standard Rates',
        href: routes.eventMaster.rate,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'City Tier',
        href: routes.eventMaster.city,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
    ],
  },
  {
    name: 'Job Management',
    href: '#',
    icon: <PiShapesDuotone />,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    dropdownItems: [
      {
        name: 'Event Jobs',
        href: routes.jobManagement.event,
        badge: '',
        roles: ['superAdmin', 'eventAdmin'],
      },
      {
        name: 'PNP Jobs',
        href: routes.jobManagement.pnp,
        badge: '',
        roles: ['superAdmin', 'pnpAdmin'],
      },
    ],
  },
  {
    name: 'Reports',
    href: '#',
    icon: <PiChartLineUpDuotone />,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    dropdownItems: [
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
  {
    name: 'Event Management',
    href: routes.eventManagement.event,
    icon: <PiCalendarPlusDuotone />,
    roles: ['eventUser', 'operationHead', 'eventHead'],
  },
  // {
  //   name: 'Client Approve',
  //   href: routes.eventManagement.client,
  //   icon: <PiNewspaperClippingDuotone />,
  //   roles: ['eventUser', 'operationHead', 'eventHead'],
  // },
  {
    name: 'Vendor Rate',
    href: routes.eventManagement.vendor,
    icon: <PiNewspaperClippingDuotone />,
    roles: ['eventUser', 'operationHead', 'eventHead'],
  },
  {
    name: 'Event Approve',
    href: routes.eventManagement.eventApprove,
    icon: <PiClipboardTextDuotone />,
    roles: ['eventUser', 'operationHead', 'eventHead', 'financeHead'],
  },
  {
    name: 'Job Status',
    href: routes.eventManagement.eventTracker,
    icon: <PiListChecksDuotone />,
    roles: [
      'eventUser',
      'operationHead',
      'eventHead',
      'financeHead',
      'financeExecutive',
      'financeManager',
    ],
  },
  {
    name: 'PO Management',
    href: routes.POManagement.po,
    icon: <PiClipboardTextDuotone />,
    roles: [
      'financeExecutive',
      'financeManager',
      'financeHead',
      'eventUser',
      'operationHead',
      'eventHead',
    ],
  },
  {
    name: 'Invoice Management',
    href: routes.InvoiceManagement.invoice,
    icon: <AiTwotoneFileText />,
    roles: [
      'financeExecutive',
      'financeManager',
      'financeHead',
      'eventUser',
      'operationHead',
      'eventHead',
    ],
  },

  {
    name: 'Payment Management',
    href: routes.PaymentManagement.payment,
    icon: <AiTwotoneFileText />,
    roles: [
      'financeExecutive',
      'financeManager',
      'financeHead',
      // 'operationHead',
      // 'eventHead',
    ],
  },

  // // label start
  // {
  //   name: 'Overview',
  // },
  // // label end
  // {
  //   name: 'File Manager',
  //   href: '/',
  //   icon: <PiFolderDuotone />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.dashboard,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  // },
  // {
  //   name: 'Project',
  //   href: routes.project.dashboard,
  //   icon: <PiClipboardTextDuotone />,
  // },
  // {
  //   name: 'CRM',
  //   href: routes.crm.dashboard,
  //   icon: <PiFolderUserDuotone />,
  // },
  // {
  //   name: 'Affiliate',
  //   href: routes.affiliate.dashboard,
  //   icon: <PiChartPieSliceDuotone />,
  // },
  // {
  //   name: 'Store Analytics',
  //   href: routes.storeAnalytics.dashboard,
  //   icon: <PiPresentationChartDuotone />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Bidding',
  //   href: routes.bidding.dashboard,
  //   icon: <PiScalesDuotone />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Social Media',
  //   href: routes.socialMedia.dashboard,
  //   icon: <PiSparkleDuotone />,
  // },
  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard,
  //   icon: <PiShapesDuotone />,
  // },
  // {
  //   name: 'Financial',
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollarDuotone />,
  // },
  // {
  //   name: 'Logistics',
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackageDuotone />,
  // },
  // {
  //   name: 'E-Commerce',
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCartDuotone />,
  // },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBarDuotone />,
  // },
  // {
  //   name: 'Support',
  //   href: routes.support.dashboard,
  //   icon: <PiHeadsetDuotone />,
  // },
  // {
  //   name: 'Podcast',
  //   href: routes.podcast.dashboard,
  //   icon: <PiApplePodcastsLogoDuotone />,
  //   badge: 'NEW',
  // },

  // // label start
  // {
  //   name: 'Apps Kit',
  // },
  // // label end
  // {
  //   name: 'E-Commerce',
  //   href: '#',
  //   icon: <PiShoppingCartDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Products',
  //       href: routes.eCommerce.products,
  //       badge: '',
  //     },
  //     {
  //       name: 'Product Details',
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Product',
  //       href: routes.eCommerce.createProduct,
  //     },
  //     {
  //       name: 'Edit Product',
  //       href: routes.eCommerce.ediProduct(DUMMY_ID),
  //     },
  //     {
  //       name: 'Categories',
  //       href: routes.eCommerce.categories,
  //     },
  //     {
  //       name: 'Create Category',
  //       href: routes.eCommerce.createCategory,
  //     },
  //     {
  //       name: 'Edit Category',
  //       href: routes.eCommerce.editCategory(DUMMY_ID),
  //     },
  //     {
  //       name: 'Orders',
  //       href: routes.eCommerce.orders,
  //     },
  //     {
  //       name: 'Order Details',
  //       href: routes.eCommerce.orderDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Order',
  //       href: routes.eCommerce.createOrder,
  //     },
  //     {
  //       name: 'Edit Order',
  //       href: routes.eCommerce.editOrder(DUMMY_ID),
  //     },
  //     {
  //       name: 'Reviews',
  //       href: routes.eCommerce.reviews,
  //     },
  //     {
  //       name: 'Shop',
  //       href: routes.eCommerce.shop,
  //     },
  //     {
  //       name: 'Cart',
  //       href: routes.eCommerce.cart,
  //     },
  //     {
  //       name: 'Checkout & Payment',
  //       href: routes.eCommerce.checkout,
  //     },
  //   ],
  // },
  // {
  //   name: 'Support',
  //   href: '#',
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Inbox',
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: 'Snippets',
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: 'Templates',
  //       href: routes.support.templates,
  //     },
  //   ],
  // },
  // {
  //   name: 'Invoice',
  //   href: '#',
  //   icon: <PiCurrencyDollarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'List',
  //       href: routes.invoice.home,
  //     },
  //     {
  //       name: 'Details',
  //       href: routes.invoice.details(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create',
  //       href: routes.invoice.create,
  //     },
  //     {
  //       name: 'Edit',
  //       href: routes.invoice.edit(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: 'Logistics',
  //   href: '#',
  //   icon: <PiPackageDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Shipment List',
  //       href: routes.logistics.shipmentList,
  //     },
  //     {
  //       name: 'Shipment Details',
  //       href: routes.logistics.shipmentDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Shipment',
  //       href: routes.logistics.createShipment,
  //     },
  //     {
  //       name: 'Edit Shipment',
  //       href: routes.logistics.editShipment(DUMMY_ID),
  //     },
  //     {
  //       name: 'Customer Profile',
  //       href: routes.logistics.customerProfile,
  //     },
  //     {
  //       name: 'Tracking',
  //       href: routes.logistics.tracking(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: 'Job Feeds',
  //   href: routes.jobBoard.jobFeed,
  //   icon: <PiShapesDuotone />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.appointmentList,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'File Manager',
  //   href: routes.file.manager,
  //   icon: <PiFoldersDuotone />,
  // },
  // {
  //   name: 'Event Calendar',
  //   href: routes.eventCalendar,
  //   icon: <PiCalendarPlusDuotone />,
  // },
  // {
  //   name: 'Roles & Permissions',
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Point of Sale',
  //   href: routes.pos.index,
  //   icon: <PiCreditCardDuotone />,
  // },
  // {
  //   name: 'Invoice Builder',
  //   href: routes.invoice.builder,
  //   icon: <PiNewspaperClippingDuotone />,
  // },
  // {
  //   name: 'Image Viewer',
  //   href: routes.imageViewer,
  //   icon: <PiCodesandboxLogoDuotone />,
  // },
  // // label start
  // {
  //   name: 'Search & Filters',
  // },
  // {
  //   name: 'Real Estate',
  //   href: routes.searchAndFilter.realEstate,
  //   icon: <PiHouseLineDuotone />,
  // },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTiltDuotone />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiCoinDuotone />,
  // },
  // // label end
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFourDuotone />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeatherDuotone />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUpDuotone />,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImageDuotone />,
  // // },
  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLineDuotone />,
  // },
  // {
  //   name: 'Email Templates',
  //   href: routes.emailTemplates,
  //   icon: <PiEnvelopeDuotone />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGearDuotone />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRingingDuotone />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUserDuotone />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpenDuotone />,
  // },
  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiStepsDuotone />,
  // },
  // {
  //   name: 'Multi Step 2',
  //   href: routes.multiStep2,
  //   icon: <PiStairsDuotone />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCardDuotone />,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFourDuotone />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDownDuotone />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTableDuotone />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowserDuotone />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbersDuotone />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimpleDuotone />,
  // },
  // {
  //   name: 'Resizable',
  //   href: routes.tables.resizable,
  //   icon: <PiArrowsOutLineHorizontalDuotone />,
  // },
  // {
  //   name: 'Pinning',
  //   href: routes.tables.pinning,
  //   icon: <PiPushPinDuotone />,
  // },
  // {
  //   name: 'Drag & Drop',
  //   href: routes.tables.dnd,
  //   icon: <PiArrowsOutDuotone />,
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircleDuotone />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStarDuotone />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  // {
  //   name: 'Sign Up',
  //   href: '#',
  //   icon: <PiUserPlusDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign up',
  //       href: routes.auth.signUp1,
  //     },
  //     {
  //       name: 'Vintage Sign up',
  //       href: routes.auth.signUp2,
  //     },
  //     {
  //       name: 'Trendy Sign up',
  //       href: routes.auth.signUp3,
  //     },
  //     {
  //       name: 'Elegant Sign up',
  //       href: routes.auth.signUp4,
  //     },
  //     {
  //       name: 'Classic Sign up',
  //       href: routes.auth.signUp5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Sign In',
  //   href: '#',
  //   icon: <PiShieldCheckDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Sign in',
  //       href: routes.auth.signIn1,
  //     },
  //     {
  //       name: 'Vintage Sign in',
  //       href: routes.auth.signIn2,
  //     },
  //     {
  //       name: 'Trendy Sign in',
  //       href: routes.auth.signIn3,
  //     },
  //     {
  //       name: 'Elegant Sign in',
  //       href: routes.auth.signIn4,
  //     },
  //     {
  //       name: 'Classic Sign in',
  //       href: routes.auth.signIn5,
  //     },
  //   ],
  // },
  // {
  //   name: 'Forgot Password',
  //   href: '#',
  //   icon: <PiLockKeyDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern Forgot password',
  //       href: routes.auth.forgotPassword1,
  //     },
  //     {
  //       name: 'Vintage Forgot password',
  //       href: routes.auth.forgotPassword2,
  //     },
  //     {
  //       name: 'Trendy Forgot password',
  //       href: routes.auth.forgotPassword3,
  //     },
  //     {
  //       name: 'Elegant Forgot password',
  //       href: routes.auth.forgotPassword4,
  //     },
  //     {
  //       name: 'Classic Forgot password',
  //       href: routes.auth.forgotPassword5,
  //     },
  //   ],
  // },
  // {
  //   name: 'OTP Pages',
  //   href: '#',
  //   icon: <PiChatCenteredDotsDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Modern OTP page',
  //       href: routes.auth.otp1,
  //     },
  //     {
  //       name: 'Vintage OTP page',
  //       href: routes.auth.otp2,
  //     },
  //     {
  //       name: 'Trendy OTP page',
  //       href: routes.auth.otp3,
  //     },
  //     {
  //       name: 'Elegant OTP page',
  //       href: routes.auth.otp4,
  //     },
  //     {
  //       name: 'Classic OTP page',
  //       href: routes.auth.otp5,
  //     },
  //   ],
  // },
];
