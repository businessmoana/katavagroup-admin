import { AdminIcon } from '@/components/icons/admin-icon';
import { BanUser } from '@/components/icons/ban-user';
import { EyeIcon } from '@/components/icons/category/eyes-icon';
import { CheckMarkCircle } from '@/components/icons/checkmark-circle';
import { CloseFillIcon } from '@/components/icons/close-fill';
import { EditIcon } from '@/components/icons/edit';
import { Eye } from '@/components/icons/eye-icon';
import { TrashIcon } from '@/components/icons/trash';
import { WalletPointsIcon } from '@/components/icons/wallet-point';
import Link from '@/components/ui/link';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { getAuthCredentials } from '@/utils/auth-utils';
import { STAFF, SUPER_ADMIN } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { approveModalInitialValues } from '@/utils/constants';
import { useAtom } from 'jotai';
import { ExternalLinkIcon } from '@/components/icons/external-link';
import { Tooltip } from '@/components/ui/tooltip';
import { AddIcon } from '../icons/add';
import { EyeOff } from '../icons/eye-off-icon';
import Button from '../ui/button';
import Badge from '../ui/badge/badge';

type Props = {
  id: string;
  editModalView?: string | any;
  deleteModalView?: string | any;
  editUrl?: string;
  previewUrl?: string;
  enablePreviewMode?: boolean;
  detailsUrl?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
  chefApproveButton?: boolean;
  termApproveButton?: boolean;
  couponApproveButton?: boolean;
  showAddWalletPoints?: boolean;
  changeRefundStatus?: boolean;
  showMakeAdminButton?: boolean;
  showReplyQuestion?: boolean;
  customLocale?: string;
  isTermsApproved?: boolean;
  isCouponApprove?: boolean;
  flashSaleVendorRequestApproveButton?: boolean;
  isFlashSaleVendorRequestApproved?: boolean;
  transferShopOwnership?: boolean;
  data?: {
    [key: string]: string | boolean | number;
  };
  disabled?: boolean;
  isChefActive?: number;
  priceGroupApproveButton?: boolean;
  isPriceGroupActive?: number;
  dateIntervalApproveButton?: boolean;
  isDateIntervalActive?: number;
  changeSalesItem?: boolean;
  changeChefsStatement?: boolean;
  chefsStatementApproveButton?: boolean;
  isChefsStatementActive?: number;
};

const ActionButtons = ({
  id,
  editModalView,
  deleteModalView,
  editUrl,
  previewUrl,
  enablePreviewMode = false,
  detailsUrl,
  userStatus = false,
  isUserActive = false,
  isShopActive,
  chefApproveButton = false,
  approveButton = false,
  termApproveButton = false,
  showAddWalletPoints = false,
  changeRefundStatus = false,
  showMakeAdminButton = false,
  showReplyQuestion = false,
  customLocale,
  isTermsApproved,
  couponApproveButton,
  isCouponApprove,
  flashSaleVendorRequestApproveButton = false,
  isFlashSaleVendorRequestApproved,
  transferShopOwnership,
  data,
  disabled,
  isChefActive,
  priceGroupApproveButton,
  isPriceGroupActive,
  dateIntervalApproveButton,
  isDateIntervalActive,
  changeSalesItem,
  chefsStatementApproveButton,
  isChefsStatementActive,
  changeChefsStatement,
}: Props) => {
  const { t } = useTranslation();
  const { openModal } = useModalAction();
  const router = useRouter();
  const { role } = getAuthCredentials();
  const [_, setApproveModal] = useAtom(approveModalInitialValues);

  function handleDelete() {
    openModal(deleteModalView, id);
  }

  function handleEditModal() {
    openModal(editModalView, id);
  }

  function handleSalesEditModal() {
    openModal('UPDATE_OR_CREATE_SALES', { id, data });
  }

  function handleUserStatus(type: string) {
    openModal('BAN_CUSTOMER', { id, type });
  }

  function handleAddWalletPoints() {
    openModal('ADD_WALLET_POINTS', id);
  }

  function handleMakeAdmin() {
    openModal('MAKE_ADMIN', id);
  }

  function handleUpdateRefundStatus() {
    openModal('UPDATE_REFUND', id);
  }

  function handleShopStatus(status: boolean) {
    if (status === true) {
      openModal('SHOP_APPROVE_VIEW', { id, data });
      if (Boolean(data?.multiCommission)) {
        setApproveModal(true);
      }
    } else {
      openModal('SHOP_DISAPPROVE_VIEW', id);
    }
  }

  function handleChefStatus(status: boolean) {
    if (status === true) {
      openModal('CHEF_ACTIVE_VIEW', id);
    } else {
      openModal('CHEF_INACTIVE_VIEW', id);
    }
  }

  function handleChefsStatementStatus(status: boolean) {
    if (status === true) {
      openModal('CHEF_ACTIVE_VIEW', id);
    } else {
      openModal('CHEF_INACTIVE_VIEW', id);
    }
  }

  function handlePriceGroupStatus(status: boolean) {
    if (status === true) {
      openModal('PRICE_GROUP_ACTIVE_VIEW', id);
    } else {
      openModal('PRICE_GROUP_INACTIVE_VIEW', id);
    }
  }

  function handleDateIntervalStatus(status: boolean) {
    if (status === true) {
      openModal('DATE_INTERVAL_ACTIVE_VIEW', id);
    } else {
      openModal('DATE_INTERVAL_INACTIVE_VIEW', id);
    }
  }

  function handleTermsStatus(status: boolean) {
    if (status === true) {
      openModal('TERM_APPROVE_VIEW', id);
    } else {
      openModal('TERM_DISAPPROVE_VIEW', id);
    }
  }

  function handleCouponStatus(status: boolean) {
    if (status === true) {
      openModal('COUPON_APPROVE_VIEW', id);
    } else {
      openModal('COUPON_DISAPPROVE_VIEW', id);
    }
  }

  function handleReplyQuestion() {
    openModal('REPLY_QUESTION', id);
  }

  function handleVendorFlashSaleStatus(status: boolean) {
    if (status !== true) {
      openModal('VENDOR_FS_REQUEST_APPROVE_VIEW', id);
    } else {
      openModal('VENDOR_FS_REQUEST_DISAPPROVE_VIEW', id);
    }
  }
  const handleTransferOwnership = () => {
    if (!disabled) {
      openModal('TRANSFER_SHOP_OWNERSHIP_VIEW', data);
    }
  };

  // TODO: need to be checked about last coupon code.

  return (
    <div className="inline-flex items-center w-auto gap-3">
      {showReplyQuestion && (
        <button
          onClick={handleReplyQuestion}
          className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
        >
          {t('form:button-text-reply')}
        </button>
      )}
      {showMakeAdminButton && (
        <button
          onClick={handleMakeAdmin}
          className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
          title={t('common:text-make-admin')}
        >
          <AdminIcon width={17} />
        </button>
      )}
      {showAddWalletPoints && (
        <button
          onClick={handleAddWalletPoints}
          className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
          title={t('common:text-add-wallet-points')}
        >
          <WalletPointsIcon width={18} />
        </button>
      )}

      {changeSalesItem && (
        <button
          onClick={handleSalesEditModal}
          className="transition duration-200 text-body hover:text-heading focus:outline-none"
          title={id ? t('common:text-edit') : 'Add'}
        >
          {id ? <EditIcon width={16} /> : <AddIcon width={16} />}
        </button>
      )}

      {changeChefsStatement && (
        <button
          onClick={handleSalesEditModal}
          className="transition duration-200 text-body hover:text-heading focus:outline-none"
          title={id ? t('common:text-edit') : 'Add'}
        >
          {id ? <EditIcon width={16} /> : <AddIcon width={16} />}
        </button>
      )}

      {changeRefundStatus && (
        <button
          onClick={handleUpdateRefundStatus}
          className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
          title={t('common:text-change-refund-status')}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}

      {editModalView && (
        <button
          onClick={handleEditModal}
          className="transition duration-200 text-body hover:text-heading focus:outline-none"
          title={id ? t('common:text-edit') : 'Add'}
        >
          {id ? <EditIcon width={16} /> : <AddIcon width={16} />}
        </button>
      )}
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
            title={t('common:text-approve-shop')}
          >
            <CheckMarkCircle width={16} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title={t('common:text-disapprove-shop')}
          >
            <CloseFillIcon width={16} />
          </button>
        ))}

      {chefApproveButton && (
        <div
          className="cursor-pointer mr-1"
          onClick={() => handleChefStatus(isChefActive == 1)}
        >
          <Badge
            textKey={!isChefActive ? 'DEACTIVATE CHEF' : 'ACTIVATE CHEF'}
            color={
              !isChefActive
                ? 'bg-status-failed/10 text-status-failed'
                : ' bg-accent/100 !text-white'
            }
          />
        </div>
      )}

      {chefsStatementApproveButton &&
        (isChefsStatementActive ? (
          <button
            onClick={() => handleChefsStatementStatus(true)}
            className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
            title="Active Chef"
          >
            <CheckMarkCircle width={16} />
          </button>
        ) : (
          <button
            onClick={() => handleChefsStatementStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Diactive Chef ?"
          >
            <CloseFillIcon width={16} />
          </button>
        ))}

      {priceGroupApproveButton &&
        (isPriceGroupActive ? (
          <button
            onClick={() => handlePriceGroupStatus(true)}
            className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
            title="Active Price Group"
          >
            <CheckMarkCircle width={16} />
          </button>
        ) : (
          <button
            onClick={() => handlePriceGroupStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title="Diactive Price Group ?"
          >
            <CloseFillIcon width={16} />
          </button>
        ))}

      {
        dateIntervalApproveButton && (
          <div
            className="cursor-pointer mr-1"
            onClick={() => handleChefStatus(isDateIntervalActive == 1)}
          >
            <Badge
              textKey={!isDateIntervalActive ? 'DEACTIVATE' : 'ACTIVATE'}
              color={
                !isDateIntervalActive
                  ? 'bg-status-failed/10 text-status-failed'
                  : ' bg-accent/100 !text-white'
              }
            />
          </div>
        )
      }

      {couponApproveButton &&
        role === SUPER_ADMIN &&
        (!isCouponApprove ? (
          <button
            onClick={() => handleCouponStatus(true)}
            className="ml-3 transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
            title={t('common:text-approve-coupon')}
          >
            <CheckMarkCircle width={18} />
          </button>
        ) : (
          <button
            onClick={() => handleCouponStatus(false)}
            className="ml-3 text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title={t('common:text-disapprove-coupon')}
          >
            <CloseFillIcon width={18} />
          </button>
        ))}

      {termApproveButton &&
        (!isTermsApproved ? (
          <button
            onClick={() => handleTermsStatus(true)}
            className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
            title={t('common:text-approve-shop')}
          >
            <CheckMarkCircle width={16} />
          </button>
        ) : (
          <button
            onClick={() => handleTermsStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title={t('common:text-disapprove-shop')}
          >
            <CloseFillIcon width={17} />
          </button>
        ))}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus('ban')}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title={t('common:text-ban-user')}
            >
              <BanUser width={16} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus('active')}
              className="transition duration-200 text-accent hover:text-accent focus:outline-none"
              title={t('common:text-activate-user')}
            >
              <CheckMarkCircle width={16} />
            </button>
          )}
        </>
      )}
      {editUrl && (
        <Link
          href={editUrl}
          className="text-base transition duration-200 hover:text-heading"
          title={t('common:text-edit')}
        >
          <EditIcon width={15} />
        </Link>
      )}
      {enablePreviewMode && (
        <>
          {previewUrl && (
            <Link
              href={previewUrl}
              className="text-base transition duration-200 hover:text-heading"
              title={t('common:text-preview')}
              target="_blank"
            >
              <EyeIcon width={18} />
            </Link>
          )}
        </>
      )}
      {detailsUrl && (
        <>
          {id ? (
            <Button>
              <Link
                href={detailsUrl}
                className="text-base transition duration-200 hover:text-heading"
                title={t('common:text-view')}
                locale={customLocale}
              >
                <Eye className="w-5 h-5" />
              </Link>
            </Button>
          ) : (
            <EyeOff className="w-5 h-5" color="red" />
          )}
        </>
      )}

      {deleteModalView && (
        <>
          {id ? (
            (role !== STAFF ||
              router.asPath !==
                `/${router.query.shop}${Routes.coupon.list}`) && (
              <button
                onClick={handleDelete}
                className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
                title={t('common:text-delete')}
              >
                <TrashIcon width={14} />
              </button>
            )
          ) : (
            <button
              className="text-gray-500 transition duration-200 hover:text-gray-600 focus:outline-none pointer-events-none"
              title={t('common:text-delete')}
            >
              <TrashIcon width={14} />
            </button>
          )}
        </>
      )}

      {/* {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={t('common:text-delete')}
        >
          <TrashIcon width={14} />
        </button>
      )} */}

      {flashSaleVendorRequestApproveButton &&
        (isFlashSaleVendorRequestApproved ? (
          <button
            onClick={() => handleVendorFlashSaleStatus(true)}
            className="transition duration-200 text-red-500 hover:text-red-600 focus:outline-none"
            title="Disapprove request ?"
          >
            <CloseFillIcon width={17} />
          </button>
        ) : (
          <button
            onClick={() => handleVendorFlashSaleStatus(false)}
            className="text-green-500 transition duration-200 hover:text-green-600 focus:outline-none"
            title="Approve request ?"
          >
            <CheckMarkCircle width={16} />
          </button>
        ))}

      {transferShopOwnership && (
        <Tooltip
          content={
            disabled
              ? 'Ownership transfer is disabled currently!'
              : t('text-transfer-shop-ownership-status')
          }
          placement="top-end"
          rounded="none"
        >
          <button
            disabled={disabled}
            onClick={handleTransferOwnership}
            className="transition duration-200 text-accent hover:text-accent-hover focus:outline-none"
          >
            <ExternalLinkIcon width={20} />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default ActionButtons;
