'use client';
import { useRef, useState } from 'react'
import styles from './image-picker.module.css'
import Image from 'next/image';


export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();

  const ImageInput = useRef();

  const handleClick = () => {
    ImageInput.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    }

    fileReader.readAsDataURL(file); // read image as url
  }

  return (<div className={styles.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={styles.controls}>
      <div className={styles.preview}>
        {!pickedImage && <p>No Image selected!</p>}
        {pickedImage &&
          <Image src={pickedImage} alt='image selected by the user' fill />}
      </div>
      <input className={styles.input}
        type='file'
        id={name} name={name}
        accept='image/png, image/jpeg'
        ref={ImageInput}
        onChange={handleImageChange}
      />
    </div>

    <button
      type='button'
      className={styles.button}
      onClick={handleClick}
    >Pick an Image</button>

  </div>)
}