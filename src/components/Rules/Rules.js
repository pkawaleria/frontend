import React from 'react';
import SingleCard from './SingleCard';
import Backimg from '../../assets/images/background.jpg'
import '../../assets/style/rules/rules.css'

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
            className="bg-cover bg-center bg-no-repeat bg-image "
            style={{ backgroundImage: `url(${Backimg})` }}
        >
            <div className="container mx-auto px-4">
                <h1 className="text-center text-black text-3xl font-bold mb-4">Regulamin Serwisu Ogłoszeniowego</h1>
                {chunkedRulesPoints.map((chunk, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center">
                        {chunk.map((point, index) => (
                            <div key={index} className="w-full md:w-1/3 px-4">
                                <SingleCard point={point} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Regulamin;
