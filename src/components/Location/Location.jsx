import { Button, DropdownSection, ErrorMessage, WeatherCard } from 'components';
import styles from './location.module.css';
import { useGeolocation } from 'hooks';

export const Location = () => {
  const { locationPreview, isLocationPreviewLoading, locationPreviewError, fetchPreview, onApply, onReject } =
    useGeolocation();

  return (
    <>
      {!locationPreviewError && (
        <>
          <DropdownSection
            title={isLocationPreviewLoading ? 'Определяем геолокацию...' : 'Вы находитесь в этом городе?'}
          >
            <div className={styles.contentWrapper}>
              <WeatherCard
                data={locationPreview}
                isLoading={isLocationPreviewLoading}
                error={locationPreviewError}
                onReload={fetchPreview}
                likeButton={false}
              />
            </div>
          </DropdownSection>
          {!isLocationPreviewLoading && !locationPreviewError && (
            <div className={styles.buttonBlock}>
              <Button view="secondary" text="Нет" onClick={onReject} />
              <Button text="Да" onClick={onApply} />
            </div>
          )}
        </>
      )}

      {locationPreviewError && (
        <div className={styles.contentWrapper}>
          <ErrorMessage
            color="dark"
            size="medium"
            align="left"
            title="Местоположение не определено"
            descriptions={locationPreviewError}
          />
        </div>
      )}
    </>
  );
};
