import { useRef, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  setupIonicReact
} from '@ionic/react';

import { calculatorOutline, refreshOutline } from 'ionicons/icons';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';
import Kalkulator from './components/Kalkulator';

setupIonicReact();

const App: React.FC = () => {
  const wzrostRef = useRef<HTMLIonInputElement>(null);
  const wagaRef = useRef<HTMLIonInputElement>(null);

  const [obliczoneBMI, setObliczoneBMI] = useState<number>();

  const oblicz = () => {
    const wzrost = wzrostRef.current!.value;
    const waga = wagaRef.current!.value;

    if (!wzrost || !waga) {
      return;
    }

    const wzrostM = Number(wzrost) / 100;
    const bmi = Number(waga) / (wzrostM * wzrostM);

    setObliczoneBMI(bmi);
  };

  const resetuj = () => {
    wzrostRef.current!.value = '';
    wagaRef.current!.value = '';
    setObliczoneBMI(undefined);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kalkulator BMI</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Wzrost (cm)"
                  labelPlacement="floating"
                  type="number"
                  ref={wzrostRef}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput
                  label="Waga (kg)"
                  labelPlacement="floating"
                  type="number"
                  ref={wagaRef}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={oblicz}>
                <IonIcon slot="start" icon={calculatorOutline} />
                Oblicz
              </IonButton>
            </IonCol>

            <IonCol className="ion-text-right">
              <IonButton onClick={resetuj} color="medium">
                <IonIcon slot="start" icon={refreshOutline} />
                Resetuj
              </IonButton>
            </IonCol>
          </IonRow>

          {obliczoneBMI !== undefined && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <h2>BMI: {obliczoneBMI.toFixed(2)}</h2>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>

        <Kalkulator />
      </IonContent>
    </IonApp>
  );
};

export default App;
