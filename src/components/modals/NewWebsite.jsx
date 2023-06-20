import { baseUrl } from "lib/api";
import React, { useState } from "react";
import { Text, Spinner, useColorModeValue, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const fiedStyles = {
  input:
    "w-full rounded-md p-2 px-4 focus:border focus:border-amber-600  bg-slate-200",
};

const NewWebsite = ({ show, onClose, render, userId }) => {
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const toast = useToast();
  const [formData, setFormData] = useState({
    icon: null,
    name: "",
    website: "",
    userId,
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "icon") {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          resolve(reader.result);
          setFormData({ ...formData, [name]: reader.result });
        };
        reader.onerror = (error) => reject(error);
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log("FOrm data", formData);
      const resp = await fetch(`${baseUrl}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      setTimeout(() => {
        setLoading(false);
        setFormData({
          icon: null,
          name: "",
          website: "",
          userId,
        });
        toast({
          status: "success",
          title: data["message"],
          isClosable: true,
        });
        if (render) {
          render();
        }

        onClose();
      }, data);

      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        status: "error",
        title: "Operation Failed",
        isClosable: true,
      });
      return;
    }
  };
  return (
    <Modal isOpen={show} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Website</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            className="flex flex-col space-y-4 items-center"
            onSubmit={handleSubmit}
          >
            <div className=" cursor-pointer">
              {formData["icon"] ? (
                <label htmlFor="icon" className=" cursor-pointer py-4">
                  <img
                    src={formData["icon"]}
                    alt="company icon"
                    className=" object-cover h-44 w-44 rounded-md mt-6 "
                  />
                </label>
              ) : (
                <label
                  htmlFor="icon"
                  className=" cursor-pointer flex justify-center items-center border-2 border-dashed border-slate-300 p-14 rounded-xl mt-6"
                >
                  +
                </label>
              )}
              <input
                type="file"
                className="hidden"
                id="icon"
                name="icon"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="name" className="flex items-center space-x-1">
                Name <Text color={brandStars}>*</Text>
              </label>
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleChange}
                className={fiedStyles.input}
                placeholder="Official Name"
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="website" className="flex items-center space-x-1">
                Url <Text color={brandStars}>*</Text>
              </label>
              <input
                name="website"
                id="website"
                type="text"
                onChange={handleChange}
                className={fiedStyles.input}
                placeholder="mail@sitepatrol.com"
                required
              />
            </div>

            <div className="py-4 w-full flex justify-end space-x-4 items-center">
              <button
                variant="ghost"
                className="bg-slate-400 rounded-lg font-semibold hover:text-black hover:bg-slate-300 duration-200 ease-in py-2 px-3 text-white"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={`${
                  !loading && "bg-[#3965FF]"
                } font-semibold py-2 px-3 rounded-lg duration-200 ease-in text-white hover:text-[#3965FF]  hover:bg-white  `}
                type="submit"
                onClick={handleSubmit}
              >
                {loading ? <Spinner color="#3965FF" /> : "Create"}
              </button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewWebsite;
