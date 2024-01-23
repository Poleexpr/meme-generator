import { useState, useEffect } from 'react'

const Meme = () => {
	const [meme, setMeme] = useState({
		topText: '',
		bottomText: '',
		randomImage: 'http://i.imgflip.com/1bij.jpg',
	})

	interface allMemes {
		url: string
	}

	const [allMemes, setAllMemes] = useState<allMemes[]>([])
	console.log(allMemes)

	//https://api.imgflip.com/get_memes
	//data.data.memes

	useEffect(() => {
		const getMemes = async () => {
			const res = await fetch('https://api.imgflip.com/get_memes')
			const data = await res.json()
			setAllMemes(data.data.memes)
		}
		getMemes()
	}, [])

	const getMemeImage = () => {
		const randomNumber = Math.floor(Math.random() * allMemes.length)
		const url = allMemes[randomNumber].url

		setMeme(prevMeme => ({
			...prevMeme,
			randomImage: url,
		}))
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setMeme(prevMeme => ({
			...prevMeme,
			[name]: value,
		}))
	}

	return (
		<main>
			<div className='form'>
				<input
					type='text'
					placeholder='Top text'
					className='form_input'
					name='topText'
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type='text'
					placeholder='Bottom text'
					className='form_input'
					name='bottomText'
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button className='form_button' onClick={getMemeImage}>
					Get a new meme image 🥶
				</button>
			</div>
			<div className='meme'>
				<img src={meme.randomImage} className='meme_image' />
				<h2 className='meme_text top'>{meme.topText}</h2>
				<h2 className='meme_text bottom'>{meme.bottomText}</h2>
			</div>
		</main>
	)
}

export default Meme
