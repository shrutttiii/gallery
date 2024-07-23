import React, { useState } from 'react';
import './style.css'; // Import your CSS file for styling

const Gallery = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // New state for image file input
  const [description, setDescription] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State for modal image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Store the file for later use
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddImage = () => {
    if (image && description) {
      if (isEditing && currentIndex !== null) {
        // Editing existing image
        const updatedGallery = [...gallery];
        updatedGallery[currentIndex] = { image, description };
        setGallery(updatedGallery);
        setIsEditing(false);
        setCurrentIndex(null);
        setImage(null);
        setImageFile(null); // Clear the file input state
        setDescription('');
      } else {
        // Adding new image
        setGallery([...gallery, { image, description }]);
        setImage(null);
        setImageFile(null); // Clear the file input state
        setDescription('');
      }
    }
  };

  const deleteImage = (index) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    setGallery(newGallery);
  };

  const editImage = (item, index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setImage(item.image); // Pre-fill image URL for editing
    setDescription(item.description); // Pre-fill description for editing
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentIndex(null);
    setImage(null);
    setImageFile(null); // Clear the file input state
    setDescription('');
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="gallery-container">
      <h1>Image Gallery</h1>
      <div className="input-container">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="button-container">
        {!isEditing ? (
          <button onClick={handleAddImage}>Add Image</button>
        ) : (
          <div>
            <button onClick={handleAddImage}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </div>
      <div className="gallery">
        {gallery.map((item, index) => (
          <div key={index} className="image-item">
            <img src={item.image} alt="Gallery" onClick={() => openModal(item.image)} />
            {isEditing && currentIndex === index ? (
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={handleDescriptionChange}
              />
            ) : (
              <p>{item.description}</p>
            )}
            <div className="action-buttons">
              <button onClick={() => editImage(item, index)}>Edit</button>
              <button onClick={() => deleteImage(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Large View" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
