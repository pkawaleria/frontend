import React, {useEffect, useState} from "react";
import {BiCategoryAlt, BiPhotoAlbum} from "react-icons/bi";
import {MdOutlineDescription, MdTitle} from "react-icons/md";
import {FaMapMarkerAlt} from "react-icons/fa";
import {AiOutlinePhone} from "react-icons/ai";
import {GrMoney} from "react-icons/gr";
import {GiMatterStates} from "react-icons/gi";
import Select from "react-select";
import {searchCities} from "../../services/citiesService";
import {fetchFinalNodeCategories} from "../../services/categoryService";
import {formatToOptions} from "../../services/formattingUtils";
import {addImagesToAuction, createAuction} from "../../services/auctionsService";
import {useNavigate} from "react-router-dom";


export default function NewAuction() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [price, setPrice] = useState();
    const [condition, setCondition] = useState("");

    const defaultImagePreviews = new Array(10).fill(null);
    const [imagePreviews, setImagePreviews] = useState(defaultImagePreviews);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [conditionError, setConditionError] = useState("");

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [searchedCities, setSearchedCities] = useState([]);
    const [selectableCategories, setSelectableCategories] = useState([]);
    const [messagePopup, setMessagePopup] = useState({show: false, message: '', type: ''});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topLevelCategories, cities] = await Promise.all([
                    fetchFinalNodeCategories().then(fetchedCategories => formatToOptions(fetchedCategories)),
                    searchCities(''),
                ]);
                setSelectableCategories(topLevelCategories);
                setSearchedCities(formatToOptions(cities));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const handleImageUpload = (e) => {
        const selectedImages = Array.from(e.target.files);
        const selectedImagePreviews = [...imagePreviews];

        selectedImages.forEach((image, index) => {
            if (image.type.includes("image") && index < defaultImagePreviews.length) {
                selectedImagePreviews[index] = URL.createObjectURL(image);
            }
        });

        setImages(selectedImages);
        setImagePreviews(selectedImagePreviews);
    };


    const validateTitle = () => {
        if (title.length < 10) {
            setTitleError("Tytuł musi zawierać co najmniej 10 znaków.");
        } else {
            setTitleError("");
        }
    };

    const validateDescription = () => {
        if (description.length < 60) {
            setDescriptionError("Opis musi zawierać co najmniej 60 znaków.");
        } else {
            setDescriptionError("");
        }
    };

    const validatePhoneNumber = () => {
        if (!phoneNumber.match(/^\d{9}$/)) {
            setPhoneNumberError("Numer telefonu musi zawierać dokładnie 9 cyfr.");
        } else {
            setPhoneNumberError("");
        }
    };

    const validatePrice = (value) => {
        if (value === "") {
            setPriceError("Cena jest wymagana.");
        } else if (parseFloat(value) <= 0) {
            setPriceError("Cena musi być większa od zera.");
        } else {
            setPriceError("");
        }
    };

    const validateCondition = () => {
        if (condition === "") {
            setConditionError("Stan jest wymagany.");
        } else {
            setConditionError("");
        }
    };

    const isFormValid = () => {
        return (
            title &&
            selectedCategory &&
            selectedCityId &&
            images.length > 0 &&
            description &&
            phoneNumber &&
            price &&
            title.length >= 10 &&
            description.length >= 60 &&
            phoneNumber.match(/^\d{9}$/) &&
            condition
        );
    };

    const handleAddAuction = async () => {
        if (!isFormValid()) {
            return;
        }
        setIsConfirmationModalOpen(true);
    };

    const prepareAuctionPostPayload = () => {
        return {
            name: title,
            description: description,
            price: price,
            categoryId: selectedCategory.value,
            productCondition: condition,
            cityId: selectedCityId.value,
            phoneNumber: phoneNumber,
        }
    }

    const confirmAddAuction = async () => {
        if (!isConfirmationModalOpen) return;
        setIsConfirmationModalOpen(false);

        try {
            const auctionResponse = await createAuction(prepareAuctionPostPayload());
            const auctionId = auctionResponse.id;
            const formData = prepareImageUploadFormData(images);
            await addImagesToAuction(auctionId, formData);
            showPopupMessage("Ogłoszenie zostało pomyślnie dodane i oczekuje na weryfikację. " +
                "To może potrwać do kilku minut. Przejdź do moich ogłoszeń.", "success");
        } catch (error) {
            console.error("Error during auction process:", error);
            showPopupMessage("Wystąpił błąd podczas dodawania ogłoszenia.", "error");
        }
    };

    const showPopupMessage = (message, type) => {
        setMessagePopup({show: true, message, type});
        setTimeout(() => setMessagePopup({show: false, message: '', type: ''}), 5000);
    };

    const prepareImageUploadFormData = (images) => {
        const formData = new FormData();
        images.forEach(image => {
            formData.append('files', image);
        });
        return formData;
    };


    const handleCityInputChange = (inputValue) => {
        if (inputValue) {
            searchCities(inputValue).then(
                cities => setSearchedCities(formatToOptions(cities))
            );
            setSelectedCityId(null);
        }
    };

    const handleCitySelectionChange = (selectedOption) => {
        setSelectedCityId(selectedOption);
    };

    const handleCategorySelectionChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    const handlePopupClose = () => {
        if (messagePopup.type === "success") {
            navigate('/twoje-ogloszenia');
        }
        setMessagePopup({ ...messagePopup, show: false });
    }
 
    return (
        <>
            <div className="items-center gradient-bg-color-only">
                <h2 className="w-[55%] mx-auto text-2xl mb-4 text-white font-bold bg-blue-500 py-2 text-center rounded-lg border border-blue-500">
                    Dodaj nowe ogłoszenie
                </h2>
                <div className="w-[60%] mx-auto mt-5 mb-5 bg-white rounded-lg shadow-md relative">
                    <form className="bg-white py-3 px-8 border-0 w-2/3 self-center">
                        <div className="mb-4">
                            <MdTitle size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="title"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Tytuł ogłoszenia:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    validateTitle();
                                }}
                                onBlur={validateTitle}
                                className={`w-[80%] p-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500 ${
                                    titleError ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {titleError && <p className="text-red-500">{titleError}</p>}
                        </div>
                        <div className="mb-4">
                            <BiCategoryAlt size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="category"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Kategoria:
                            </label>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategorySelectionChange}
                                options={selectableCategories}
                                placeholder="Kategoria"
                                className="text-gray-700 react-select-container flex-grow"
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                        <div className="mb-4">
                            <GiMatterStates size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="condition"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Stan:
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                value={condition}
                                onChange={(e) => {
                                    setCondition(e.target.value);
                                    validateCondition();
                                }}
                                onBlur={validateCondition}
                                className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none `}
                                required
                            >
                                <option value="" className="bg-gray-300">
                                    Wybierz stan
                                </option>
                                <option value="NEW" className="bg-gray-300">
                                    Nowy
                                </option>
                                <option value="USED" className="bg-gray-300">
                                    Używany
                                </option>
                                <option value="DAMAGED" className="bg-gray-300">
                                    Uszkodzony
                                </option>
                                <option value="NOT_APPLIED" className="bg-gray-300">
                                    Nie dotyczy
                                </option>
                            </select>
                            {conditionError && <p className="text-red-500">{conditionError}</p>}
                        </div>
                        <div className="mb-4">
                            <BiPhotoAlbum size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="images"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Zdjęcia:
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/jpeg, image/jpg, image/png"
                                multiple
                                onChange={handleImageUpload}
                                className={`w-[60%] p-2 border border-blue-500 rounded-md focus:outline-none `}
                            />
                            <div className="mt-2 flex flex-wrap">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="mr-2 mb-2">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                width="100"
                                                height="100"
                                                style={{
                                                    objectFit: "cover",
                                                    width: "100px",
                                                    height: "100px",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="w-[100px] h-[100px] border border-blue-500 flex items-center justify-center text-gray-400">
                                                Zdjęcie {index + 1}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <MdOutlineDescription size={25} className="inline-block mr-2"/>{" "}
                            <label
                                htmlFor="description"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Opis ogłoszenia:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    validateDescription();
                                }}
                                onBlur={validateDescription}
                                rows="4"
                                className={`w-[90%] p-2 border border-blue-500 rounded-md focus:outline-none ${
                                    descriptionError ? "border-red-500" : "focus:border-blue-500"
                                }`}
                                required
                            ></textarea>
                            {descriptionError && (
                                <p className="text-red-500">{descriptionError}</p>
                            )}
                        </div>
                        <div className="mb-4 relative">
                            <FaMapMarkerAlt size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="city"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Miasto:
                            </label>
                            <Select
                                value={selectedCityId}
                                onChange={handleCitySelectionChange}
                                onInputChange={handleCityInputChange}
                                options={searchedCities}
                                placeholder="Miasto"
                                className="text-gray-700 react-select-container flex-grow"
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>

                        <div className="mb-4">
                            <AiOutlinePhone size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="phoneNumber"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Numer telefonu:
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    validatePhoneNumber();
                                }}
                                onBlur={validatePhoneNumber}
                                className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none ${
                                    phoneNumberError ? "border-red-500" : "focus:border-blue-500"
                                }`}
                                required
                            />
                            {phoneNumberError && (
                                <p className="text-red-500">{phoneNumberError}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <GrMoney size={25} className="inline-block mr-2"/>
                            <label
                                htmlFor="price"
                                className="block text-gray-600 font-medium mb-2"
                            >
                                Cena:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    validatePrice(e.target.value);
                                }}
                                onBlur={() => validatePrice(price)}
                                className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none ${
                                    priceError ? "border-red-500" : "focus:border-blue-500"
                                }`}
                                required
                            />
                            {priceError && <p className="text-red-500">{priceError}</p>}
                        </div>
                        <button
                            type="button"
                            onClick={handleAddAuction}
                            className={`absolute bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${
                                isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!isFormValid()}
                        >
                            Dodaj ogłoszenie
                        </button>
                    </form>
                </div>
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg font-semibold mb-4 text-center">Czy na pewno chcesz dodać
                                ogłoszenie?</p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md"
                                    onClick={confirmAddAuction}
                                >
                                    Tak, dodaj ogłoszenie
                                </button>
                                <button
                                    className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-4 rounded-md"
                                    onClick={() => setIsConfirmationModalOpen(false)}
                                >
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {messagePopup.show && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg font-semibold mb-4 text-center">
                                ${messagePopup.message}
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md"
                                    onClick={handlePopupClose}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );}
