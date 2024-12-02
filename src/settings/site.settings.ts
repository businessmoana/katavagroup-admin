import {
  adminAndOwnerOnly,
  adminOnly,
  adminOwnerAndStaffOnly,
  ownerAndStaffOnly,
} from '@/utils/auth-utils';
import { Routes } from '@/config/routes';

export const siteSettings = {
  name: 'Katava Group',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'Katava Group',
    href: '/',
    width: 200,
    height: 45,
  },
  collapseLogo: {
    url: '/collapse-logo.svg',
    alt: 'P',
    href: '/',
    width: 32,
    height: 32,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
      icon: 'LogOutIcon',
      permission: adminOwnerAndStaffOnly,
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: {
      root: {
        href: Routes.dashboard,
        label: 'Main',
        icon: 'DashboardIcon',
        childMenu: [
          {
            href: Routes.dashboard,
            label: 'sidebar-nav-item-dashboard',
            icon: 'DashboardIcon',
          },
        ],
      },

      chef: {
        href: '',
        label: 'chef-management',
        icon: 'StaffIcon',
        childMenu: [
          {
            href: '',
            label: 'sidebar-nav-item-chefs',
            icon: 'StaffIcon',
            childMenu: [
              {
                href: Routes.chef.list,
                label: 'text-all-chefs',
                icon: '',
              },
              {
                href: Routes.chefOrders,
                label: 'Chef Orders',
                icon: '',
              },
              {
                href: Routes.chefInvoices,
                label: 'Chef Invoices',
                icon: '',
              },
              {
                href: Routes.sales,
                label: 'Sales',
                icon: '',
              },
              {
                href: Routes.marketStatement,
                label: 'Market Statement',
                icon: '',
              },
              {
                href: Routes.chefsStatement,
                label: 'Chefs Statement',
                icon: '',
              },
              // {
              //   href: Routes.groupChefsStatement,
              //   label: 'Group Chefs Statement',
              //   icon: '',
              // },
            ],
          },
        ],
      },

      product: {
        href: '',
        label: 'text-product-management',
        icon: 'ProductsIcon',
        childMenu: [
          {
            href: '',
            label: 'Product',
            icon: 'ProductsIcon',
            childMenu: [
              {
                href: Routes.product.list,
                label: 'All Products',
                icon: '',
              },
              {
                href: Routes.product.pickPackList,
                label: 'Pick & Pack List',
                icon: '',
              },
            ],
          },
        ],
      },

      location: {
        href: '',
        label: 'Location management',
        icon: 'LocationIcon',
        childMenu: [
          {
            href: '',
            label: 'Location',
            icon: 'LocationIcon',
            childMenu: [
              {
                href: Routes.location.list,
                label: 'Location',
                icon: '',
              },
            ],
          },
        ],
      },
      
      dataList: {
        href: '',
        label: 'data-management',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: '',
            label: 'DATA LIST',
            icon: 'SettingsIcon',
            childMenu: [
              {
                href: Routes.priceGroup.list,
                label: 'Price Group',
                icon: '',
              },
              {
                href: Routes.dateInterval.list,
                label: 'Date Interval',
                icon: '',
              },
            ],
          },
        ],
      },

      report: {
        href: '',
        label: 'Report management',
        icon: 'StoreNoticeIcon',
        childMenu: [
          {
            href: '',
            label: 'Report management',
            icon: 'StoreNoticeIcon',
            childMenu: [
              {
                href: Routes.invoiceSalesReport,
                label: 'INVOICES vs SALES',
                icon: '',
              },
              {
                href: Routes.invoiceCombineReport,
                label: 'Combined Invoices',
                icon: '',
              },
              {
                href: Routes.salesReport,
                label: 'Sales Report',
                icon: '',
              },
              {
                href: Routes.averageSold,
                label: 'Average Product Sold',
                icon: '',
              },
            ],
          },
        ],
      },

    },



    shop: {
      root: {
        href: '',
        label: 'text-main',
        icon: 'DashboardIcon',
        childMenu: [
          {
            href: (shop: string) => `${Routes.dashboard}${shop}`,
            label: 'sidebar-nav-item-dashboard',
            icon: 'DashboardIcon',
            permissions: adminOwnerAndStaffOnly,
          },
        ],
      },

      // analytics: {
      //   href: (shop: string) => `/${shop}${Routes.product.list}`,
      //   label: 'Analytics',
      //   icon: 'ShopIcon',
      //   permissions: adminAndOwnerOnly,
      //   childMenu: [
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Shop',
      //       icon: 'ShopIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Product',
      //       icon: 'ProductsIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Order',
      //       icon: 'OrdersIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Sale',
      //       icon: 'ShopIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //   ],
      // },

      product: {
        href: '',
        label: 'text-product-management',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.product.list}`,
            label: 'sidebar-nav-item-products',
            icon: 'ProductsIcon',
            childMenu: [
              {
                href: (shop: string) => `/${shop}${Routes.product.list}`,
                label: 'text-all-products',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) => `/${shop}${Routes.product.create}`,
                label: 'text-new-products',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) => `/${shop}${Routes.draftProducts}`,
                label: 'text-my-draft',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.outOfStockOrLowProducts}`,
                label: 'text-all-out-of-stock',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
            ],
          },
          {
            href: (shop: string) => `/${shop}${Routes.productInventory}`,
            label: 'text-inventory',
            icon: 'InventoryIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.attribute.list}`,
            label: 'sidebar-nav-item-attributes',
            icon: 'AttributeIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.manufacturer.list}`,
            label: 'sidebar-nav-item-manufacturers',
            icon: 'DiaryIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.author.list}`,
            label: 'sidebar-nav-item-authors',
            icon: 'FountainPenIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      financial: {
        href: '',
        label: 'text-financial-management',
        icon: 'WithdrawIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
            label: 'sidebar-nav-item-withdraws',
            icon: 'AttributeIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.refund.list}`,
            label: 'sidebar-nav-item-refunds',
            icon: 'RefundsIcon',
            permissions: adminOwnerAndStaffOnly,
          },
        ],
      },

      order: {
        href: '',
        label: 'text-order-management',
        icon: 'OrdersIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.order.list}`,
            label: 'sidebar-nav-item-orders',
            icon: 'OrdersIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.transaction}`,
            label: 'text-transactions',
            icon: 'CalendarScheduleIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      feature: {
        href: '',
        label: 'text-feature-management',
        icon: 'ProductsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.storeNotice.list}`,
            label: 'sidebar-nav-item-store-notice',
            icon: 'StoreNoticeIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `${Routes.ownerDashboardMessage}`,
            label: 'sidebar-nav-item-message',
            icon: 'ChatIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      feedback: {
        href: '',
        label: 'text-feedback-control',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.reviews.list}`,
            label: 'sidebar-nav-item-reviews',
            icon: 'ReviewIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.question.list}`,
            label: 'sidebar-nav-item-questions',
            icon: 'QuestionIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      user: {
        href: '',
        label: 'text-user-control',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.staff.list}`,
            label: 'sidebar-nav-item-staffs',
            icon: 'UsersIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      promotional: {
        href: '',
        label: 'text-promotional-control',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.coupon.list}`,
            label: 'Coupons',
            icon: 'CouponsIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.flashSale.list}`,
            label: 'text-flash-sale',
            icon: 'UsersIcon',
            childMenu: [
              {
                href: (shop: string) => `/${shop}${Routes.flashSale.list}`,
                label: 'text-available-flash-deals',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.myProductsInFlashSale}`,
                label: 'text-my-products-in-deals',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.vendorRequestForFlashSale.list}`,
                label: 'Ask for enrollment',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
            ],
          },
        ],
      },

      layout: {
        href: '',
        label: 'text-page-management',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.faqs.list}`,
            label: 'text-faqs',
            icon: 'TypesIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.termsAndCondition.list}`,
            label: 'Terms And Conditions',
            icon: 'TypesIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },
    },

    staff: {
      root: {
        href: '',
        label: 'text-main',
        icon: 'DashboardIcon',
        childMenu: [
          {
            href: (shop: string) => `${Routes.dashboard}${shop}`,
            label: 'sidebar-nav-item-dashboard',
            icon: 'DashboardIcon',
            permissions: adminOwnerAndStaffOnly,
          },
        ],
      },

      // analytics: {
      //   href: (shop: string) => `/${shop}${Routes.product.list}`,
      //   label: 'Analytics',
      //   icon: 'ShopIcon',
      //   permissions: adminAndOwnerOnly,
      //   childMenu: [
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Shop',
      //       icon: 'ShopIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Product',
      //       icon: 'ProductsIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Order',
      //       icon: 'OrdersIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.product.list}`,
      //       label: 'Sale',
      //       icon: 'ShopIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //   ],
      // },

      product: {
        href: '',
        label: 'text-product-management',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.product.list}`,
            label: 'sidebar-nav-item-products',
            icon: 'ProductsIcon',
            childMenu: [
              {
                href: (shop: string) => `/${shop}${Routes.product.list}`,
                label: 'text-all-products',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) => `/${shop}${Routes.product.create}`,
                label: 'text-new-products',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) => `/${shop}${Routes.draftProducts}`,
                label: 'text-my-draft',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.outOfStockOrLowProducts}`,
                label: 'text-low-out-of-stock',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
            ],
          },
          {
            href: (shop: string) => `/${shop}${Routes.productInventory}`,
            label: 'text-inventory',
            icon: 'InventoryIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.attribute.list}`,
            label: 'sidebar-nav-item-attributes',
            icon: 'AttributeIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.manufacturer.list}`,
            label: 'sidebar-nav-item-manufacturers',
            icon: 'DiaryIcon',
            permissions: adminAndOwnerOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.author.list}`,
            label: 'sidebar-nav-item-authors',
            icon: 'FountainPenIcon',
            permissions: adminAndOwnerOnly,
          },
        ],
      },

      financial: {
        href: '',
        label: 'text-financial-management',
        icon: 'WithdrawIcon',
        childMenu: [
          // {
          //   href: (shop: string) => `/${shop}${Routes.withdraw.list}`,
          //   label: 'sidebar-nav-item-withdraws',
          //   icon: 'AttributeIcon',
          //   permissions: adminAndOwnerOnly,
          // },
          {
            href: (shop: string) => `/${shop}${Routes.refund.list}`,
            label: 'sidebar-nav-item-refunds',
            icon: 'RefundsIcon',
            permissions: adminOwnerAndStaffOnly,
          },
        ],
      },

      order: {
        href: '',
        label: 'text-order-management',
        icon: 'OrdersIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.order.list}`,
            label: 'sidebar-nav-item-orders',
            icon: 'OrdersIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          // {
          //   href: (shop: string) => `/${shop}${Routes.transaction}`,
          //   label: 'Transactions',
          //   icon: 'CalendarScheduleIcon',
          //   permissions: adminAndOwnerOnly,
          // },
        ],
      },

      // feature: {
      //   href: '',
      //   label: 'Features Management',
      //   icon: 'ProductsIcon',
      //   childMenu: [
      //     {
      //       href: (shop: string) => `/${shop}${Routes.storeNotice.list}`,
      //       label: 'sidebar-nav-item-store-notice',
      //       icon: 'StoreNoticeIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `${Routes.message.list}`,
      //       label: 'sidebar-nav-item-message',
      //       icon: 'ChatIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //   ],
      // },

      // feedback: {
      //   href: '',
      //   label: 'Feedback control',
      //   icon: 'SettingsIcon',
      //   childMenu: [
      //     {
      //       href: (shop: string) => `/${shop}${Routes.reviews.list}`,
      //       label: 'sidebar-nav-item-reviews',
      //       icon: 'ReviewIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //     {
      //       href: (shop: string) => `/${shop}${Routes.question.list}`,
      //       label: 'sidebar-nav-item-questions',
      //       icon: 'QuestionIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //   ],
      // },

      // user: {
      //   href: '',
      //   label: 'User control',
      //   icon: 'SettingsIcon',
      //   childMenu: [
      //     {
      //       href: (shop: string) => `/${shop}${Routes.staff.list}`,
      //       label: 'sidebar-nav-item-staffs',
      //       icon: 'UsersIcon',
      //       permissions: adminAndOwnerOnly,
      //     },
      //   ],
      // },

      promotional: {
        href: '',
        label: 'text-promotional-control',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.coupon.list}`,
            label: 'Coupons',
            icon: 'CouponsIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          {
            href: (shop: string) => `/${shop}${Routes.flashSale.list}`,
            label: 'text-flash-sale',
            icon: 'UsersIcon',
            childMenu: [
              {
                href: (shop: string) => `/${shop}${Routes.flashSale.list}`,
                label: 'text-available-flash-deals',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.myProductsInFlashSale}`,
                label: 'text-my-products-in-deals',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
              {
                href: (shop: string) =>
                  `/${shop}${Routes.vendorRequestForFlashSale.list}`,
                label: 'See all enrollment request',
                icon: 'ProductsIcon',
                permissions: adminOwnerAndStaffOnly,
              },
            ],
          },
        ],
      },

      layout: {
        href: '',
        label: 'text-page-management',
        icon: 'SettingsIcon',
        childMenu: [
          {
            href: (shop: string) => `/${shop}${Routes.faqs.list}`,
            label: 'text-faqs',
            icon: 'TypesIcon',
            permissions: adminOwnerAndStaffOnly,
          },
          // {
          //   href: (shop: string) => `/${shop}${Routes.termsAndCondition.list}`,
          //   label: 'Terms And Conditions',
          //   icon: 'TypesIcon',
          //   permissions: adminAndOwnerOnly,
          // },
        ],
      },
    },

    ownerDashboard: [
      {
        href: Routes.dashboard,
        label: 'Shop',
        icon: 'ShopIcon',
        permissions: ownerAndStaffOnly,
      },
      {
        href: Routes?.ownerDashboardMyShop,
        label: 'Orders',
        icon: 'ChatOwnerIcon',
        permissions: ownerAndStaffOnly,
      },
      {
        href: Routes?.ownerDashboardMessage,
        label: 'Invoices',
        icon: 'ChatOwnerIcon',
        permissions: ownerAndStaffOnly,
      },
      {
        href: Routes?.ownerDashboardNotice,
        label: 'Chefs statement',
        icon: 'ChatOwnerIcon',
        permissions: ownerAndStaffOnly,
      },
      {
        href: Routes?.ownerDashboardShopTransferRequest,
        label: 'Shop Transfer Request',
        icon: 'MyShopIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};

export const socialIcon = [
  {
    value: 'FacebookIcon',
    label: 'Facebook',
  },
  {
    value: 'InstagramIcon',
    label: 'Instagram',
  },
  {
    value: 'TwitterIcon',
    label: 'Twitter',
  },
  {
    value: 'YouTubeIcon',
    label: 'Youtube',
  },
];
