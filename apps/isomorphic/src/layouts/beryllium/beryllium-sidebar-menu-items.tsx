import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import { AiTwotoneFileText } from 'react-icons/ai';

import {
  PiAirplaneTilt,
  PiApplePodcastsLogo,
  PiArrowsOut,
  PiArrowsOutLineHorizontalBold,
  PiBellSimpleRinging,
  PiBinoculars,
  PiBoundingBox,
  PiBriefcase,
  PiBriefcaseDuotone,
  PiBrowser,
  PiCalendar,
  PiCalendarPlusDuotone,
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
  PiFolder,
  PiFolderLock,
  PiFolderUser,
  PiFolderUserDuotone,
  PiGridFour,
  PiHammer,
  PiHeadset,
  PiHourglassSimple,
  PiHouseLine,
  PiListChecksDuotone,
  PiLockKey,
  PiMapPinLine,
  PiNewspaperClipping,
  PiNewspaperClippingDuotone,
  PiNoteBlank,
  PiPackage,
  PiPackageDuotone,
  PiPokerChip,
  PiPresentationChart,
  PiPushPin,
  PiRocketLaunch,
  PiScales,
  PiShapes,
  PiShapesDuotone,
  PiShieldCheck,
  PiShootingStar,
  PiShoppingCart,
  PiSparkle,
  PiSquaresFour,
  PiStack,
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

// Note: do not add href in the label object, it is rendering as label
export const berylliumSidebarMenuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <PiChartPieSliceDuotone />,
    roles: ['superAdmin', 'pnpAdmin', 'eventAdmin'],
    badge: '',
  },
  {
    name: 'User Types',
    href: '#',
    icon: <PiUsersDuotone />,
    roles: ['superAdmin'],
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
        name: 'PNP Clients',
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
        href: routes.companyManagement.division,
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
    badge: '',
  },
  {
    name: 'Vendor Rate',
    href: routes.eventManagement.vendor,
    icon: <PiNewspaperClippingDuotone />,
    roles: ['eventUser', 'operationHead', 'eventHead'],
    badge: '',
  },
  {
    name: 'Event Approve',
    href: routes.eventManagement.eventApprove,
    icon: <PiClipboardTextDuotone />,
    roles: ['eventUser', 'operationHead', 'eventHead', 'financeHead'],
    badge: '',
  },
  {
    name: 'Job Status',
    href: routes.eventManagement.eventTracker,
    icon: <PiListChecksDuotone />,
    roles: [
      'eventUser',
      'operationHead',
      'eventHead',
      'financeExecutive',
      'financeManager',
      'financeHead',
    ],
    badge: '',
  },
  // {
  //   name: 'Client Approval',
  //   href: routes.eventManagement.client,
  //   icon: <PiNewspaperClippingDuotone />,
  //   roles: ['eventUser', 'operationHead', 'eventHead'],
  //   badge: '',
  // },

  {
    name: 'PO Management',
    href: routes.POManagement.po,
    icon: <PiClipboardTextDuotone />,
    roles: [
      'financeExecutive',
      'financeManager',
      'financeHead',
      // 'eventUser',
      // 'operationHead',
      // 'eventHead',
    ],
    badge: '',
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
      // 'operationHead',
      // 'eventHead',
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
      // 'eventUser',
      // 'operationHead',
      // 'eventHead',
    ],
    badge: '',
  },
  {
    name: 'Vendor Delivery',
    href: routes.deliveryManagement.vendor,
    icon: <PiFile />,
    roles: ['deliveryUser'],
  },
  {
    name: 'Client Delivery',
    href: routes.deliveryManagement.client,
    icon: <PiFile />,
    roles: ['deliveryUser'],
  },

  // // label start
  // {
  //   name: 'Overview',
  // },
  // // label end
  // {
  //   name: 'File Manager',
  //   href: '/',
  //   icon: <PiFolder />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.dashboard,
  //   icon: <PiCalendar />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcase />,
  // },
  // {
  //   name: 'Project',
  //   href: routes.project.dashboard,
  //   icon: <PiClipboardText />,
  // },
  // {
  //   name: 'CRM',
  //   href: routes.crm.dashboard,
  //   icon: <PiFolderUser />,
  // },
  // {
  //   name: 'Affiliate',
  //   href: routes.affiliate.dashboard,
  //   icon: <PiChartPieSlice />,
  // },
  // {
  //   name: 'Store Analytics',
  //   href: routes.storeAnalytics.dashboard,
  //   icon: <PiPresentationChart />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Bidding',
  //   href: routes.bidding.dashboard,
  //   icon: <PiScales />,
  //   badge: 'NEW',
  // },
  // {
  //   name: 'Social Media',
  //   href: routes.socialMedia.dashboard,
  //   icon: <PiSparkle />,
  // },
  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard,
  //   icon: <PiShapes />,
  // },
  // {
  //   name: 'Financial',
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollar />,
  // },
  // {
  //   name: 'Logistics',
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackage />,
  // },
  // {
  //   name: 'Job Feeds',
  //   href: routes.jobBoard.jobFeed,
  //   icon: <PiShapes />,
  // },
  // {
  //   name: 'E-Commerce',
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCart />,
  // },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBar />,
  // },
  // {
  //   name: 'Support',
  //   href: routes.support.dashboard,
  //   icon: <PiHeadset />,
  // },
  // {
  //   name: 'Podcast',
  //   href: routes.podcast.dashboard,
  //   icon: <PiApplePodcastsLogo />,
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
  //   icon: <PiShoppingCart />,
  //   dropdownItems: [
  //     {
  //       name: 'Products',
  //       href: routes.eCommerce.products,
  //     },
  //     {
  //       name: 'Product Details',
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Product',
  //       href: routes.eCommerce.createProduct,
  //       badge: '',
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
  //   icon: <PiHeadset />,
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
  //   icon: <PiCurrencyDollar />,
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
  //   icon: <PiPackage />,
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
  //   name: 'File Manager',
  //   href: routes.file.manager,
  //   icon: <PiFolder />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.appointmentList,
  //   icon: <PiCalendar />,
  // },
  // {
  //   name: 'Roles & Permissions',
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLock />,
  // },
  // {
  //   name: 'Point of Sell',
  //   href: routes.pos.index,
  //   icon: <PiCreditCard />,
  // },
  // {
  //   name: 'Invoice Builder',
  //   href: routes.invoice.builder,
  //   icon: <PiNewspaperClipping />,
  // },
  // {
  //   name: 'Image Viewer',
  //   href: routes.imageViewer,
  //   icon: <PiCodesandboxLogo />,
  // },
  // // label start
  // {
  //   name: 'Search & Filters',
  // },
  // {
  //   name: 'Real Estate',
  //   href: routes.searchAndFilter.realEstate,
  //   icon: <PiHouseLine />,
  // },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTilt />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiPokerChip />,
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
  //   icon: <PiSquaresFour />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeather />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUp />,
  // },
  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLine />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGear />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRinging />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUser />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpen />,
  // },
  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiSteps />,
  // },
  // {
  //   name: 'Multi Step 2',
  //   href: routes.multiStep2,
  //   icon: <PiStairs />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCard />,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFour />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiStack />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTable />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowser />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiBoundingBox />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimple />,
  // },
  // {
  //   name: 'Resizable',
  //   href: routes.tables.resizable,
  //   icon: <PiArrowsOutLineHorizontalBold />,
  // },
  // {
  //   name: 'Pinning',
  //   href: routes.tables.pinning,
  //   icon: <PiPushPin />,
  // },
  // {
  //   name: 'Drag & Drop',
  //   href: routes.tables.dnd,
  //   icon: <PiArrowsOut />,
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // // label end
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircle />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStar />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunch />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLock />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinoculars />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammer />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlank />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  // {
  //   name: 'Sign Up',
  //   href: '#',
  //   icon: <PiUserPlus />,
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
  //   icon: <PiShieldCheck />,
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
  //   icon: <PiLockKey />,
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
  //   icon: <PiChatCenteredDots />,
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
