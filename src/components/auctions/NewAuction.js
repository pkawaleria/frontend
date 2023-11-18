import React, { useState, useRef } from "react";
import { BiCategoryAlt, BiPhotoAlbum } from "react-icons/bi";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";
import { GiMatterStates } from "react-icons/gi";

import axios from "axios";

export default function NewAuction() {
  const token = localStorage.getItem("accessToken");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [cityId, setCityId] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState();
  const [condition, setCondition] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isCityListVisible, setCityListVisible] = useState(false);
  const defaultImagePreviews = new Array(10).fill(null);
  const [imagePreviews, setImagePreviews] = useState(defaultImagePreviews);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [conditionError, setConditionError] = useState("");

  const nameRef = useRef(null);

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
      title !== "" &&
      category !== "" &&
      images.length > 0 &&
      description !== "" &&
      name !== "" &&
      phoneNumber !== "" &&
      price !== "" &&
      title.length >= 10 &&
      description.length >= 60 &&
      phoneNumber.match(/^\d{9}$/) &&
      priceError === "" &&
      condition !== ""
    );
  };

  const handleAddAuction = async () => {
    if (!isFormValid()) {
      return;
    }

    // Otwórz modal potwierdzenia
    setIsConfirmationModalOpen(true);
  };

  const confirmAddAuction = async () => {
    // Zamknij modal potwierdzenia
    setIsConfirmationModalOpen(false);

    // Kod dodawania aukcji (bez zmian)

    // Poniżej znajduje się kod, który był wewnątrz bloku try-catch w handleAddAuction,
    // teraz jest wewnątrz bloku if, który sprawdza, czy aukcja została potwierdzona

    if (isConfirmationModalOpen) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL,
          {
            name: title,
            description: description,
            price: price,
            categoryId: "6519380366f3c27c5697d61b", //tymczasowo TODO
            productCondition: condition,
            cityId: cityId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const auctionId = response.data.id;

          const formData = new FormData();
          images.forEach((image, index) => {
            formData.append(`files`, image);
          });

          const imageResponse = await axios.post(
            `${process.env.REACT_APP_AUCTIONS_MS_AUCTION_SERVICE_AUCTIONS_URL}/${auctionId}/images`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (imageResponse.status === 200) {
            window.location = "/twoje-ogloszenia";
            alert("Ogłoszenie zostało dodane.");
          } else {
            alert("Wystąpił błąd podczas dodawania obrazów aukcji.");
          }
        } else {
          alert("Wystąpił błąd podczas dodawania aukcji.");
        }
      } catch (error) {
        console.error("Wystąpił błąd:", error);
        alert("Wystąpił błąd podczas dodawania ogłoszenia.");
      }
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_AUCTIONS_MS_CITIES_SEARCH_URL}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            searchCityName: nameRef.current.value,
          },
        }
      );
      setDataList(response.data.cities);
      setCityListVisible(true);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania sugestii miast:", error);
    }
  };

  const handleCitySelect = (selectedCityId) => {
    setCityListVisible(false);
  };

  return (
    <div className="items-center gradient-bg-color-only">
      <h2 className="w-[55%] mx-auto text-2xl mb-4 text-white font-bold bg-blue-500 py-2 text-center rounded-lg border border-blue-500">
        Dodaj nowe ogłoszenie
      </h2>
      <div className="w-[60%] mx-auto mt-5 mb-5 bg-white rounded-lg shadow-md relative">
        <form className="bg-white py-3 px-8 border-0 w-2/3 self-center">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-600 font-medium mb-2"
            >
              Tytuł ogłoszenia:
            </label>
            <MdTitle size={25} className="inline-block mr-2" />
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
            <label
              htmlFor="category"
              className="block text-gray-600 font-medium mb-2"
            >
              Kategoria:
            </label>
            <BiCategoryAlt size={25} className="inline-block mr-2" />
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none`}
              required
            >
              <option value="" className="bg-gray-300">
                Wybierz kategorię
              </option>
              <option value="Electronics" className="bg-gray-300">
                Elektronika
              </option>
              <option value="Ogród" className="bg-gray-300">
                Ogród
              </option>
              <option value="Motoryzacja" className="bg-gray-300">
                Motoryzacja
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="condition"
              className="block text-gray-600 font-medium mb-2"
            >
              Stan:
            </label>
            <GiMatterStates size={25} className="inline-block mr-2" />
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
            <label
              htmlFor="images"
              className="block text-gray-600 font-medium mb-2"
            >
              Zdjęcia:
            </label>
            <BiPhotoAlbum size={25} className="inline-block mr-2" />
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
                    <div className="w-[100px] h-[100px] border border-blue-500 flex items-center justify-center text-gray-400">
                      Zdjęcie {index + 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium mb-2"
            >
              <MdOutlineDescription size={25} className="inline-block mr-2" />{" "}
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
            <label
              htmlFor="city"
              className="block text-gray-600 font-medium mb-2"
            >
              Miasto:
            </label>
            <FaMapMarkerAlt size={25} className="inline-block mr-2" />
            <input
              type="text"
              id="city"
              name="city"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                fetchCities();
              }}
              onBlur={() => {
                setCityListVisible(false);
              }}
              ref={nameRef}
              className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none`}
              required
              list="cities"
            />
            {isCityListVisible && (
              <datalist
                className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-[50%] z-10"
                id="cities"
              >
                {dataList.map((city) => (
                  <option
                    key={city.id}
                    className="py-1 px-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleCitySelect(city.id)}
                  >
                    {city.name}
                  </option>
                ))}
              </datalist>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-600 font-medium mb-2"
            >
              Numer telefonu:
            </label>
            <AiOutlinePhone size={25} className="inline-block mr-2" />
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
            <label
              htmlFor="price"
              className="block text-gray-600 font-medium mb-2"
            >
              Cena:
            </label>
            <GrMoney size={25} className="inline-block mr-2" />
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
                        <p className="text-lg font-semibold mb-4 text-center">Czy na pewno chcesz dodać ogłoszenie?</p>
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
    </div>
  );
}
