import React, { useState } from "react";
import { BiCategoryAlt, BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineDescription, MdTitle } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlinePhone } from 'react-icons/ai';

export default function NewAuction() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [province, setProvince] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const defaultImagePreviews = new Array(10).fill(null); 
    const [imagePreviews, setImagePreviews] = useState(defaultImagePreviews);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

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

    const isFormValid = () => {
        return (
            title !== "" &&
            category !== "" &&
            images.length > 0 &&
            description !== "" &&
            province !== "" &&
            phoneNumber !== "" &&
            title.length >= 10 &&
            description.length >= 60 &&
            phoneNumber.match(/^\d{9}$/)
        );
    };

    return (
        <div className="items-center gradient-bg-color-only">
            <h2 className="w-[55%] mx-auto text-2xl mb-4 text-white font-bold bg-blue-500 py-2 text-center rounded-lg border border-blue-500">
                Dodaj nowe ogłoszenie
            </h2>
            <div className="w-[60%] mx-auto mt-5 mb-5 bg-white rounded-lg shadow-md relative">
                <form className="bg-white py-3 px-8 border-0 w-2/3 self-center">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-600 font-medium mb-2">Tytuł ogłoszenia:</label>
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
                            className={`w-[80%] p-2 border border-blue-500 rounded-md focus:outline-none focus:border-blue-500 ${titleError ? 'border-red-500' : ''}`}
                            required
                        />
                        {titleError && <p className="text-red-500">{titleError}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-600 font-medium mb-2">Kategoria:</label>
                        <BiCategoryAlt size={25} className="inline-block mr-2" />
                        <select
                            id="category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none`}
                            required
                        >
                            <option value="" className='bg-gray-300'>Wybierz kategorię</option>
                            <option value="Elektronika" className='bg-gray-300'>Elektronika</option>
                            <option value="Ogród" className='bg-gray-300'>Ogród</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-gray-600 font-medium mb-2">Zdjęcia:</label>
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
                                            style={{ objectFit: 'cover', width: '100px', height: '100px' }}
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
                        <label htmlFor="description" className="block text-gray-600 font-medium mb-2">
                            <MdOutlineDescription size={25} className="inline-block mr-2" /> Opis ogłoszenia:
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
                            className={`w-[90%] p-2 border border-blue-500 rounded-md focus:outline-none ${descriptionError ? 'border-red-500' : 'focus:border-blue-500'}`}
                            required
                        ></textarea>
                        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="province" className="block text-gray-600 font-medium mb-2">Województwo:</label>
                        <FaMapMarkerAlt size={25} className="inline-block mr-2" />
                        <select
                            id="province"
                            name="province"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none `}
                            required
                        >
                            <option value="" className='bg-gray-300'>Wybierz województwo</option>
                            <option value="dolnośląskie" className='bg-gray-300'>Dolnośląskie</option>
                            <option value="kujawsko-pomorskie" className='bg-gray-300'>Kujawsko-Pomorskie</option>
                        </select>
                        
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-600 font-medium mb-2">Numer telefonu:</label>
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
                            className={`w-[50%] p-2 border border-blue-500 rounded-md focus:outline-none ${phoneNumberError ? 'border-red-500' : 'focus:border-blue-500'}`}
                            required
                        />
                        {phoneNumberError && <p className="text-red-500">{phoneNumberError}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`absolute bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${isFormValid() ? '' : 'opacity-50 cursor-not-allowed'}`}
                        disabled={!isFormValid()}
                    >
                        Dodaj ogłoszenie
                    </button>
                </form>
            </div>
        </div>
    );
}
