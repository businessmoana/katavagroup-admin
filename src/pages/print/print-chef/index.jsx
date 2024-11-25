import { usePrintChefQuery } from '@/data/print';
import PrintChef from './print';

export default function PrintChefPage() {
  const { chef } = usePrintChefQuery();

  return <>{chef && <PrintChef chef={chef} />}</>;
}
