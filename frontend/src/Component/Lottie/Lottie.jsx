import React from 'react'
import { useLottie } from "lottie-react";
import animation from '../../assets/Animation - 1701927717189.json'

const Lottie = () => {
  const options = {
    animationData: animation,
    loop: true
  };
  const { View } = useLottie(options);
  return (
    <>
      {View}
    </>
  )
}

export default Lottie;

