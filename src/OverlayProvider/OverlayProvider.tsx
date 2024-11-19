import { PropsWithChildren, useContext, useState } from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { IOverlayItem } from './types';
import { OverlaySubscriber } from './OverlaySubscriber';

/**
 * `OverlayProvider` komponenta koja pruža servis za upravljanje otvorenim i zatvorenim overlay-ima.
 * Ova komponenta koristi `OverlayService` za upravljanje stanjima overlay-a i prosleđuje ih
 * kroz `OverlayContext` kako bi bile dostupne u svim podkomponentama koje koriste `useOverlay`.
 *
 * @param children - Deca komponente koja će biti renderovana unutar providera.
 * @param overlays - Lista svih overlay-a koji će biti praćeni i prikazivani. Svaki overlay
 * sadrži `overlayName` (ime koje identifikuje overlay) i `Overlay` (komponenta koja će biti renderovana).
 *
 * @returns {JSX.Element} - Komponenta koja omogućava upravljanje overlay-ima kroz kontekst.
 */
function OverlayProvider<T extends IOverlayItem<any>[]>({
  children,
  overlays,
}: PropsWithChildren<{
  overlays: T;
}>) {
  // Inicijalizuje OverlayService, koji se koristi za upravljanje otvorenim i zatvorenim overlay-ima
  const [service, _] = useState(init);

  // Funkcija koja inicijalizuje OverlayService
  function init() {
    return new OverlayService();
  }

  return (
    <OverlayContext.Provider
      value={{
        open: service.openOverlay, // Funkcija za otvaranje overlay-a
        close: service.closeOverlay, // Funkcija za zatvaranje overlay-a
      }}
    >
      <>
        {children}
        <>
          {overlays.map(({ overlayName, Overlay }) => {
            return (
              <OverlaySubscriber
                subscribe={(handler) => {
                  // Dodaje handler za svaki overlay
                  service.addOverlayHandler(overlayName, handler);
                }}
                Overlay={Overlay}
              >
                {({ config, visible, overlayInnerElement, Overlay }) => {
                  return (
                    <Overlay
                      config={config || {}} // Prilagođava default konfiguraciju
                      open={visible} // Da li je overlay otvoren
                      Element={() => overlayInnerElement} // Element koji treba prikazati unutar overlay-a
                    />
                  );
                }}
              </OverlaySubscriber>
            );
          })}
        </>
      </>
    </OverlayContext.Provider>
  );
}

/**
 * `useOverlay` hook koji omogućava pristup funkcijama za otvaranje i zatvaranje overlay-a
 * unutar komponenata koje koriste `OverlayProvider`.
 *
 * @returns {Object} - Objekat sa funkcijama `open` i `close` koje omogućavaju upravljanje overlay-ima.
 */
const useOverlay = () => {
  const { open, close } = useContext(OverlayContext)!;
  return {
    open, // Funkcija za otvaranje overlay-a
    close, // Funkcija za zatvaranje overlay-a
  };
};

export { OverlayProvider, useOverlay };
