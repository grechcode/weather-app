import { WeatherCard } from 'components';
import { useFetchPreview } from 'hooks';

export const FetchPreviewWrapper = ({ cityData }) => {
  const { cityPreview, isCityPreviewLoading, cityPreviewError, fetchPreview } = useFetchPreview(cityData);

  return (
    <WeatherCard
      data={cityPreview}
      isLoading={isCityPreviewLoading}
      error={cityPreviewError}
      onReload={fetchPreview}
    />
  );
};
