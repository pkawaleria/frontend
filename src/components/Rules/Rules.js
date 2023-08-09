import React from 'react';
import SingleCard from './SingleCard';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Backimg from '../../assets/images/background.jpg'

const Regulamin = () => {
    const rulesPoints = [
        "Zabronione jest zamieszczanie treści obraźliwych, nielegalnych, lub naruszających prawa innych osób.",
        "Użytkownicy są odpowiedzialni za treść zamieszczanych ogłoszeń oraz komentarzy.",
        "Zabronione jest rozsyłanie spamu i niechcianych wiadomości innym użytkownikom.",
        "Administracja serwisu zobowiązuje się do ochrony danych osobowych użytkowników zgodnie z obowiązującymi przepisami.",
        "Serwis zastrzega sobie prawo do usuwania ogłoszeń naruszających regulamin lub prawo.",
        "Użytkownicy nie mogą podszywać się pod innych osób lub instytucje.",
        "Użytkownicy mogą zgłaszać naruszenia regulaminu poprzez formularz kontaktowy.",
        "Zabronione jest zamieszczanie treści naruszających prawa autorskie innych osób.",
        "Za naruszenie regulaminu grozi blokada konta.",
        "Serwis nie ponosi odpowiedzialności za treści zamieszczone przez użytkowników.",
        "Administracja zastrzega sobie prawo do modyfikacji regulaminu w każdym czasie.",
        "Zabronione jest podejmowanie działań mających na celu naruszenie działania serwisu.",
        "Wszelkie pytania i skargi można kierować na adres e-mail podany w sekcji Kontakt",
    ];

    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const chunkedRulesPoints = chunkArray(rulesPoints, 3);

    return (
        <div
            className="bg-image"
            style={{
                backgroundImage: `url(${Backimg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        >
            <Navbar />
            <div className="container my-5">
                <h1 className="text-center mb-4">Regulamin Serwisu Ogłoszeniowego</h1>
                {chunkedRulesPoints.map((chunk, rowIndex) => (
                    <div key={rowIndex} className="row justify-content-center mb-4">
                        {chunk.map((point, index) => (
                            <div key={index} className="col-md-4">
                                <SingleCard point={point} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Regulamin;
