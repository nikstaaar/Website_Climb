import gameStore from '../stores/gameStore'
import { useKeyboardControls } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Interface() {
	const stage = gameStore((state) => {
		return state.stage
	})

	const controls = useKeyboardControls((state) => state)
	const [hasClicked, setHasClicked] = useState(false)
	const { t } = useTranslation()

	useEffect(() => {
		const handleClick = () => {
			if (stage === 'walking') {
				setHasClicked(true)
			}
		}

		window.addEventListener('click', handleClick)

		return () => {
			window.removeEventListener('click', handleClick)
		}
	}, [stage === 'walking'])

	return (
		<>
			{stage === 'walking' ? (
				<div className="interface">
					{!hasClicked ? (
						<div className="instructions">{t('controls.part8')}</div>
					) : null}
					<div className="controls">
						<div className="raw">
							<div className={`key ${controls.forward ? 'active' : ''}`}></div>
						</div>
						<div className="raw">
							<div className={`key ${controls.leftward ? 'active' : ''}`}></div>
							<div className={`key ${controls.backward ? 'active' : ''}`}></div>
							<div
								className={`key ${controls.rightward ? 'active' : ''}`}
							></div>
						</div>
						<div className="raw">
							<div
								className={`key large ${controls.jump ? 'active' : ''}`}
							></div>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}
