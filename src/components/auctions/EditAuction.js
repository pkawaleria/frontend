import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiCategoryAlt, BiPhotoAlbum } from "react-icons/bi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";
import { GiMatterStates } from "react-icons/gi";
import Select from "react-select";
import { searchCities } from "../../services/citiesService";
import { fetchFinalNodeCategories } from "../../services/categoryService";
import { formatToOptions } from "../../services/formattingUtils";
import {
    updateAuction,
    fetchAuctionInfo,
    addImagesToAuction,
    getAuctionImages,
    getAuctionImage
} from "../../services/auctionsService";
import { useNavigate } from "react-router-dom"
import { useFontSize } from "../fontSize/FontSizeContext";

export default function EditAuction() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [price, setPrice] = useState("");
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
    const [messagePopup, setMessagePopup] = useState({
        show: false,
        message: "",
        type: "",
    });

    const { isFontLarge } = useFontSize();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topLevelCategories, cities] = await Promise.all([
                    fetchFinalNodeCategories().then((fetchedCategories) =>
                        formatToOptions(fetchedCategories)
                    ),
                    searchCities(""),
                ]);
                setSelectableCategories(topLevelCategories);
                setSearchedCities(formatToOptions(cities));

                if (id) {
                    const auctionData = await fetchAuctionInfo(id);
                    if (auctionData) {
                        setTitle(auctionData.name);
                        setDescription(auctionData.description);
                        setPhoneNumber(auctionData.phoneNumber);
                        setPrice(auctionData.price);
                        setCondition(auctionData.productCondition);

                        setSelectedCityId(formatToOptions([{id: auctionData.cityId, name: auctionData.cityName}]))
                        setSelectedCategory(formatToOptions([auctionData.category]));

                        const imageIDs = await getAuctionImages(id);
                        const imageUrls = await Promise.all(
                            imageIDs.map(async (imageID) => {
                                const imageUrl = await getAuctionImage(auctionData.id, imageID);
                                return imageUrl;
                            })
                        );

                        const imagePreviews = imageUrls.map((imageUrl, index) => {
                            return imageUrl
                                ? URL.createObjectURL(imageUrl)
                                : defaultImagePreviews[index];
                        });

                        // Uzupełnienie brakujących ramek dla zdjęć
                        for (let i = imagePreviews.length; i < defaultImagePreviews.length; i++) {
                            imagePreviews.push(null);
                        }

                        setImagePreviews(imagePreviews);
                    }

                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleImageUpload = (e) => {
        const selectedImages = Array.from(e.target.files);
        const selectedImagePreviews = new Array(10).fill(null);

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

    const validatePhoneNumber = (value) => {
        if (!value.match(/^\d{9}$/)) {
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

    const validateCondition = (value) => {
        if (value === "") {
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
            description &&
            phoneNumber &&
            price &&
            title.length >= 10 &&
            description.length >= 60 &&
            phoneNumber.match(/^\d{9}$/) &&
            condition
        );
    };

    const handleEditAuction = async () => {
        if (!isFormValid()) {
            return;
        }
        setIsConfirmationModalOpen(true);
    };

    const prepareEditAuctionPayload = () => {
        return {
            name: title,
            description: description,
            price: formatPrice(price),
            categoryId: selectedCategory[0].value,
            productCondition: condition,
            cityId: selectedCityId[0].value,
            phoneNumber: phoneNumber,
        };
    };

    const confirmEditAuction = async () => {
        if (!isConfirmationModalOpen) return;
        setIsConfirmationModalOpen(false);

        console.log(prepareEditAuctionPayload())

        try {
            if (images.length > 0) {
                if (images.length >= 10) {
                    showPopupMessage("Zdjęć może być maksymalnie 10")
                    return;
                } else {
                    const formData = prepareImageUploadFormData(images);
                    await addImagesToAuction(id, formData);
                }
            }

            const token = localStorage.getItem("accessToken")
            await updateAuction(id, prepareEditAuctionPayload(), token);

            showPopupMessage("Ogłoszenie zostało pomyślnie zaktualizowane.", "success");
        } catch (error) {
            console.error("Error during auction update:", error);
            showPopupMessage("Wystąpił błąd podczas aktualizacji ogłoszenia.", "error");
        }
    };

    const showPopupMessage = (message, type) => {
        setMessagePopup({ show: true, message, type });
        setTimeout(
            () => setMessagePopup({ show: false, message: "", type: "" }),
            5000
        );
    };

    const prepareImageUploadFormData = (images) => {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append("files", image);
        });
        return formData;
    };

    const handleCityInputChange = (inputValue) => {
        if (inputValue) {
            searchCities(inputValue).then((cities) =>
                setSearchedCities(formatToOptions(cities))
            );
            setSelectedCityId(null);
        }
    };

    const handleCitySelectionChange = (selectedOption) => {
        setSelectedCityId(formatToOptions([{id: selectedOption.value, name: selectedOption.label}]));
    };

    const handleCategorySelectionChange = (selectedOption) => {
        setSelectedCategory(formatToOptions([{id: selectedOption.value, name: selectedOption.label}]));
    };

    const handlePopupClose = () => {
        if (messagePopup.type === "success") {
            navigate("/twoje-ogloszenia");
        }
        setMessagePopup({ ...messagePopup, show: false });
    };

    const formatPrice = (price) => {
        return parseFloat(price).toFixed(2)
    };

    return (
        <div className="items-center gradient-bg-color-only">
            <p className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 w-[55%] mx-auto mb-4 text-white font-bold bg-blue-500 dark:bg-neutral-600 dark:border-white py-2 text-center rounded-lg border border-blue-500`}>
                Edytuj aukcję
            </p>
            <div className="w-[60%] mx-auto mt-5 mb-5 bg-white dark:bg-neutral-600 rounded-lg shadow-md relative">
                <form className="bg-white dark:bg-neutral-600 py-3 px-8 border-0 w-2/3 self-center">
                    <div className="mb-4">
                        <MdTitle className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="title"
                            className={`${isFontLarge ? "text-xl ml-2" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
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
                            className={`
                            w-[80%] p-2 border border-blue-500 dark:bg-neutral-300/30 dark:text-neutral-50
                            dark:border-neutral-200 dark:focus:border-blue-500 focus:border-blue-500 rounded-md focus:outline-none 
                            ${titleError ? "border-red-500 dark:border-red-500" : ""}
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}
                            required />
                        {titleError && <p className="text-red-500">{titleError}</p>}
                    </div>
                    <div className="mb-4">
                        <BiCategoryAlt className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="category"
                            className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Kategoria:
                        </label>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategorySelectionChange}
                            options={selectableCategories}
                            placeholder="Kategoria"
                            className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 text-gray-700 flex-grow`}
                            isClearable />
                    </div>
                    <div className="mb-4">
                        <GiMatterStates className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="condition"
                            className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Stan:
                        </label>
                        <select
                            id="condition"
                            name="condition"
                            value={condition}
                            onChange={(e) => {
                                setCondition(e.target.value);
                                validateCondition(e.target.value);
                            }}
                            onBlur={() => validateCondition(condition)}
                            className={`w-[50%] p-2 border border-blue-500 focus:border-blue-500
                            dark:focus:border-blue-500 dark:border-neutral-200 rounded-md focus:outline-none 
                            ${conditionError ? "border-red-500 dark:border-red-500" : ""} 
                            ${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100`}
                            required>
                            <option value="" className="bg-gray-300 dark:bg-neutral-600">
                                Wybierz stan
                            </option>
                            <option value="NEW" className="bg-gray-300 dark:bg-neutral-600">
                                Nowy
                            </option>
                            <option value="USED" className="bg-gray-300 dark:bg-neutral-600">
                                Używany
                            </option>
                            <option value="DAMAGED" className="bg-gray-300 dark:bg-neutral-600">
                                Uszkodzony
                            </option>
                            <option value="NOT_APPLICABLE" className="bg-gray-300 dark:bg-neutral-600">
                                Nie dotyczy
                            </option>
                        </select>
                        {conditionError && (
                            <p className="text-red-500">{conditionError}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <BiPhotoAlbum className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="images"
                            className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Zdjęcia:
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/jpeg, image/jpg, image/png"
                            multiple
                            onChange={handleImageUpload}
                            className={`
                            ${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100
                            w-[80%] p-2 border border-blue-500 dark:border-neutral-50 rounded-md focus:outline-none `} />
                        <div className="mt-2 flex flex-wrap">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="mr-2 mb-2">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            width={`${isFontLarge ? "150" : "100"}`}
                                            height={`${isFontLarge ? "150" : "100"}`}
                                            style={{
                                                objectFit: "cover",
                                                width: `${isFontLarge ? "150" : "100"}`,
                                                height: `${isFontLarge ? "150" : "100"}`,
                                            }} />
                                    ) : (
                                        <div className={`
                                        ${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100
                                        w-[100px] h-[100px] border border-blue-500 dark:border-neutral-50
                                        dark:bg-neutral-500 flex items-center justify-center 
                                        text-gray-400 dark:text-neutral-200`}>
                                            Zdjęcie {index + 1}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <MdOutlineDescription className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="description"
                            className={`${isFontLarge ? "text-xl ml-1" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
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
                            className={`
                            w-[90%] p-2 border border-blue-500 dark:bg-neutral-300/30
                            dark:text-neutral-50 dark:border-neutral-200 dark:focus:border-blue-500 
                            focus:border-blue-500 rounded-md focus:outline-none
                            ${descriptionError ? "border-red-500 dark:border-red-500" : ""}
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}
                            required />
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    </div>
                    <div className="mb-4 relative">
                        <FaMapMarkerAlt className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="city"
                            className={`${isFontLarge ? "text-xl ml-1" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Miasto:
                        </label>
                        <Select
                            value={selectedCityId}
                            onChange={handleCitySelectionChange}
                            onInputChange={handleCityInputChange}
                            options={searchedCities}
                            placeholder="Miasto"
                            className={`
                            ${isFontLarge ? "text-xl" : "text-base"}
                            text-gray-700 react-select-container flex-grow`}
                            classNamePrefix="react-select"
                            isClearable />
                    </div>
                    <div className="mb-4">
                        <AiOutlinePhone className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="phoneNumber"
                            className={`${isFontLarge ? "text-xl ml-1" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Numer telefonu:
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                validatePhoneNumber(e.target.value);
                            }}
                            onBlur={() => validatePhoneNumber(phoneNumber)}
                            className={`
                            w-[50%] p-2 border border-blue-500 dark:text-neutral-50 dark:border-neutral-200 dark:bg-neutral-300/30
                            dark:focus:border-blue-500 rounded-md focus:outline-none 
                            ${phoneNumberError ? "border-red-500 dark:border-red-500" : ""}
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}
                            required />
                        {phoneNumberError && <p className="text-red-500">{phoneNumberError}</p>}
                    </div>
                    <div className="mb-4">
                        <TbMoneybag className={`${isFontLarge ? "text-4xl" : "text-2xl"} ease-linear duration-100 inline-block mr-2 dark:text-neutral-50`} />
                        <label
                            htmlFor="price"
                            className={`${isFontLarge ? "text-xl ml-1" : "text-base"} ease-linear duration-100 block text-gray-600 dark:text-neutral-300 font-medium mb-2`}>
                            Cena:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formatPrice(price)}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                validatePrice(e.target.value);
                            }}
                            onBlur={() => validatePrice(price)}
                            className={`
                            w-[50%] p-2 border border-blue-500 dark:text-neutral-50 dark:border-neutral-200 dark:focus:border-blue-500 dark:bg-neutral-300/30
                            focus:border-blue-500 rounded-md focus:outline-none 
                            ${priceError ? "border-red-500 dark:border-red-500" : ""}
                            ${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}
                            required/>
                        {priceError && <p className="text-red-500">{priceError}</p>}
                    </div>
                    <div className="flex justify-left space-x-4">
                        <Link
                            to="/twoje-ogloszenia"
                            className={`${isFontLarge ? "text-2xl" : "text-base"} bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 ease-linear duration-100`}>
                            Moje ogłoszenia
                        </Link>
                        <Link
                            type="button"
                            onClick={handleEditAuction}
                            className={`${isFontLarge ? "text-2xl" : "text-base"} bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${isFormValid() ? "" : "opacity-50 cursor-not-allowed"}`}
                            disabled={!isFormValid()}>
                            Aktualizuj ogłoszenie
                        </Link>
                    </div>
                </form>
            </div>
            {isConfirmationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white dark:bg-neutral-600 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                    <p className={`${isFontLarge ? "text-3xl" : "text-lg"} dark:text-neutral-200 font-semibold mb-4 text-center`}>
                            Czy na pewno chcesz zaktualizować ogłoszenie?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                onClick={confirmEditAuction}>
                                Tak, zaktualizuj aukcję
                            </button>
                            <button
                                className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-red-400 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                onClick={() => setIsConfirmationModalOpen(false)}>
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {messagePopup.show && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white dark:bg-neutral-600 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                        <p className={`${isFontLarge ? "text-3xl" : "text-lg"} dark:text-neutral-200 font-semibold mb-4 text-center`}>
                            ${messagePopup.message}
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                 className={`${isFontLarge ? "text-2xl" : "text-base"} text-white dark:text-neutral-200 bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 py-2 px-4 rounded-md`}
                                onClick={handlePopupClose}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
