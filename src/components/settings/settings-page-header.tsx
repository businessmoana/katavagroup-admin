import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useScrollableSlider } from '@/utils/use-scrollable-slider';
import { ChevronRight } from '../icons/chevron-right';
import { ChevronLeft } from '../icons/chevron-left';

export default function SettingsPageHeader({
  pageTitle,
}: {
  pageTitle: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();
  // const menuItems: any =
  //   siteSettings?.sidebarLinks?.admin?.settings?.childMenu[0]?.childMenu;
  const sanitizedPath = router.asPath.split('#')[0].split('?')[0];
  return (
    <>
      <div className="flex pt-1 pb-5 sm:pb-8">
        <h1 className="text-lg font-semibold text-heading">{t(pageTitle)}</h1>
      </div>
      <div className="relative mb-9 flex items-center overflow-hidden border-b border-border-base/90 lg:mb-12">
        <button
          title="Prev"
          ref={sliderPrevBtn}
          onClick={() => scrollToTheLeft()}
          className="absolute -top-1 z-10 h-[calc(100%-4px)] w-8 bg-gradient-to-r from-gray-100 via-gray-100 to-transparent px-0 text-gray-500 start-0 hover:text-black 3xl:hidden"
        >
          <ChevronLeft className="h-[18px] w-[18px]" />
        </button>
        <div className="flex items-start overflow-hidden">
          <div
            className="custom-scrollbar-none flex w-full items-center gap-6 overflow-x-auto scroll-smooth text-[15px] md:gap-7 lg:gap-10"
            ref={sliderEl}
          >
          </div>
        </div>
        <button
          title="Next"
          ref={sliderNextBtn}
          onClick={() => scrollToTheRight()}
          className="absolute -top-1 z-10 flex h-[calc(100%-4px)] w-8 items-center justify-center bg-gradient-to-l from-gray-100 via-gray-100 to-transparent text-gray-500 end-0 hover:text-black 3xl:hidden"
        >
          <ChevronRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </>
  );
}
