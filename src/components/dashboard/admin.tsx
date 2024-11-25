import StickerCard from '@/components/widgets/sticker-card';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ShoppingIcon } from '@/components/icons/summary/shopping';
import { BasketIcon } from '@/components/icons/summary/basket';
import { ChecklistIcon } from '@/components/icons/summary/checklist';
import { LocationIcon } from '../icons/location-icon';
import { useAdminAnalyticsQuery } from '@/data/dashboard';
import RecentOrders from '../order/recent-orders';
import Search from '../common/search';
import { dashboardAdmin } from '@/data/client/dashboard';

export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { data: common, isLoading: loading } = useAdminAnalyticsQuery();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders();
  }, [common]);
  const getOrders = async () => {
    const result = await dashboardAdmin.analyticsOrders();
    console.log(result);
    setOrders(result);
  };
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  return (
    <div className="grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12">
      <div className="col-span-full rounded-lg bg-light p-6 md:p-7">
        <div className="mb-5 flex items-center justify-between md:mb-7">
          <h3 className="before:content-'' relative mt-1 bg-light text-lg font-semibold text-heading before:absolute before:-top-px before:h-7 before:w-1 before:rounded-tr-md before:rounded-br-md before:bg-accent ltr:before:-left-6 rtl:before:-right-6 md:before:-top-0.5 md:ltr:before:-left-7 md:rtl:before:-right-7 lg:before:h-8">
            {t('text-summary')}
          </h3>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StickerCard
            titleTransKey="Chefs"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<BasketIcon className="h-8 w-8" />}
            color="#1EAE98"
            price={common?.chefs}
            link="/chef/chefs"
            linkText="View all"
          />
          <StickerCard
            titleTransKey="Locations"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<LocationIcon className="h-8 w-8" />}
            color="#865DFF"
            price={common?.locations}
            link="/chef/chefs"
            linkText="View all"
          />
          <StickerCard
            titleTransKey="Products"
            icon={<ChecklistIcon className="h-8 w-8" />}
            color="#D74EFF"
            price={common?.products}
            link="/products"
            linkText="View all"
          />
          <StickerCard
            titleTransKey="Orders"
            icon={<ShoppingIcon className="h-8 w-8" />}
            color="#E157A0"
            price={common?.orders}
            link="/chef/chef-orders"
            linkText="View all"
          />
        </div>
      </div>
      <RecentOrders
        className="col-span-full"
        orders={orders}
        title="Not approved orders"
      />
    </div>
  );
}
