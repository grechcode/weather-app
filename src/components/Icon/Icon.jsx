import { ICONS } from './ICONS';

export const Icon = ({ icon = '01d', ...props }) => {
  const OutputIcon = ICONS[icon] || 'search';
  return <OutputIcon {...props} />;
};
