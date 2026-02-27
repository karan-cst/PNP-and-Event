import { GiftInquiryFormType } from '@/validators/NEW/create-enquiry.schema';

export function InquiryDefaultValues(inquiry?: GiftInquiryFormType) {
  return {
    inquiryType: inquiry?.inquiryType || 'Gift',
    inputName: inquiry?.inputName || '',
    qty: inquiry?.qty || 0,
    budget: inquiry?.budget || 0,
    division: inquiry?.division || '',
    csName: inquiry?.csName || '',
    deliveryTimeline: inquiry?.deliveryTimeline || new Date(),
    deliveryPlace: inquiry?.deliveryPlace || '',
    customized: inquiry?.customized || true,
    specialInstructions: inquiry?.specialInstructions || undefined,
    endUserOfGift: inquiry?.endUserOfGift || undefined,
  };
}
