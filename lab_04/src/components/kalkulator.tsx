import { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from '@ionic/react';

const Kalkulator: React.FC = () => {
  const [wyswietlacz, setWyswietlacz] = useState('0');
  const [poprzedniaLiczba, setPoprzedniaLiczba] =
    useState<number | null>(null);
  const [dzialanie, setDzialanie] = useState<string | null>(null);
  const [nowaLiczba, setNowaLiczba] = useState(false);

  const wpisz = (znak: string) => {
    if (nowaLiczba) {
      setWyswietlacz(znak === '.' ? '0.' : znak);
      setNowaLiczba(false);
      return;
    }

    if (znak === '.' && wyswietlacz.includes('.')) {
      return;
    }

    setWyswietlacz(
      wyswietlacz === '0' && znak !== '.'
        ? znak
        : wyswietlacz + znak
    );
  };

  const wybierzDzialanie = (operator: string) => {
    setPoprzedniaLiczba(Number(wyswietlacz));
    setDzialanie(operator);
    setNowaLiczba(true);
  };

  const oblicz = () => {
    if (poprzedniaLiczba === null || dzialanie === null) {
      return;
    }

    const drugaLiczba = Number(wyswietlacz);
    let wynik = 0;

    switch (dzialanie) {
      case '+':
        wynik = poprzedniaLiczba + drugaLiczba;
        break;

      case '−':
        wynik = poprzedniaLiczba - drugaLiczba;
        break;

      case '×':
        wynik = poprzedniaLiczba * drugaLiczba;
        break;

      case '÷':
        if (drugaLiczba === 0) {
          setWyswietlacz('Nie można dzielić przez zero');
          setPoprzedniaLiczba(null);
          setDzialanie(null);
          setNowaLiczba(true);
          return;
        }
        wynik = poprzedniaLiczba / drugaLiczba;
        break;
    }

    wynik = parseFloat(wynik.toFixed(10));

    setWyswietlacz(String(wynik));
    setPoprzedniaLiczba(null);
    setDzialanie(null);
    setNowaLiczba(true);
  };

  const wyczysc = () => {
    setWyswietlacz('0');
    setPoprzedniaLiczba(null);
    setDzialanie(null);
    setNowaLiczba(false);
  };

  const przyciski = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '−',
    'C', '0', '.', '+'
  ];

  const kliknij = (przycisk: string) => {
    if (przycisk === 'C') {
      wyczysc();
    } else if (['+', '−', '×', '÷'].includes(przycisk)) {
      wybierzDzialanie(przycisk);
    } else {
      wpisz(przycisk);
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <h2>Kalkulator</h2>

        <div
          style={{
            background: 'var(--ion-color-light)',
            padding: '20px',
            marginBottom: '15px',
            borderRadius: '8px',
            textAlign: 'right',
            minHeight: '65px',
            overflowWrap: 'anywhere'
          }}
        >
          <h1>{wyswietlacz}</h1>
        </div>

        <IonGrid>
          {Array.from({ length: 4 }, (_, row) => (
            <IonRow key={row}>
              {przyciski.slice(row * 4, row * 4 + 4).map((przycisk) => (
                <IonCol size="3" key={przycisk}>
                  <IonButton
                    expand="block"
                    color={
                      ['+', '−', '×', '÷'].includes(przycisk)
                        ? 'primary'
                        : przycisk === 'C'
                          ? 'danger'
                          : 'medium'
                    }
                    onClick={() => kliknij(przycisk)}
                  >
                    {przycisk}
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          ))}

          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" color="success" onClick={oblicz}>
                =
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default Kalkulator;
