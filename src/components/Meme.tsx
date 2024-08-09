import { useState, useRef } from 'react'

import { exportAsImage } from '../utils/helpers'
import { useGetAllMemes } from '../utils/hooks'

import '../styles/meme.scss'

export const Meme = () => {
  const exportRef = useRef<HTMLDivElement>(null)
  const { allMemes, isLoading, error } = useGetAllMemes('https://api.imgflip.com/get_memes')
  const [meme, setMeme] = useState({
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
    topText: '',
  })

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const { url } = allMemes[randomNumber]

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  return (
    <section className='form'>
      <div className='form__wrapper'>
        <div className='form__container'>
          <input
            className='form__input nes-ui-input nes-ui-is-none'
            name='topText'
            placeholder='Top text'
            type='text'
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            className='form__input nes-ui-input nes-ui-is-none'
            name='bottomText'
            placeholder='Bottom text'
            type='text'
            value={meme.bottomText}
            onChange={handleChange}
          />
          <div className='nes-ui-button-wrapper'>
            <button
              className='form__button form-button nes-ui-btn nes-ui-btn-normal nes-ui-is-size-medium undefined'
              onClick={getMemeImage}
            >
              Get a new meme image
            </button>
          </div>
        </div>
        <div ref={exportRef} className='meme'>
          <div className='meme__container'>
            {isLoading && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {allMemes && (
              <>
                <img alt='meme' className='meme__image meme-image' src={meme.randomImage} />
                <h2 className='meme__text meme__text-top meme-text'>{meme.topText}</h2>
                <h2 className='meme__text meme__text-bottom meme-text'>{meme.bottomText}</h2>
              </>
            )}
          </div>
        </div>
        <div className='generator'>
          <div className='generator__container'>
            <div className='generator__wrapper nes-ui-button-wrapper'>
              <button
                className='generator__button generator-button nes-ui-btn nes-ui-btn-normal nes-ui-is-size-medium undefined'
                onClick={() => exportAsImage(exportRef.current!, 'meme')}
              >
                Generate a meme
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
