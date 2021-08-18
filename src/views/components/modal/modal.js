import React, {
	useEffect,
	createRef,
	useCallback,
	useState,
	cloneElement
} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, hide, children }) => {
	const overlayRef = createRef()
	const modalRef = createRef()
	const [shouldAnimate, setShouldAnimate] = useState(false)

	const closeModal = useCallback(() => {
		setShouldAnimate(false)
		setTimeout(() => hide(), 500)
	}, [hide])

	const dismissModal = useCallback(
		(event) => {
			const path = event.composedPath()
			if (
				path.includes(overlayRef.current) &&
				!path.includes(modalRef.current)
			) {
				closeModal()
			}
		},
		[hide, overlayRef, modalRef]
	)

	useEffect(() => {
		window.addEventListener('click', dismissModal)

		return () => window.removeEventListener('click', dismissModal)
	}, [dismissModal])

	useEffect(() => setShouldAnimate(isOpen), [isOpen])

	return isOpen
		? createPortal(
				<>
					<div className="idg-modal__overlay" />
					<div
						className="idg-modal__wrapper"
						aria-modal
						aria-hidden
						tabIndex={-1}
						role="dialog"
						ref={overlayRef}
					>
						<div
							className={cn('idg-modal', {
								'idg-modal--fadeIn': shouldAnimate,
								'idg-modal--fadeOut': !shouldAnimate
							})}
							ref={modalRef}
						>
							<div className="idg-modal__header">
								<button
									type="button"
									className="modal__close-button"
									data-dismiss="modal"
									aria-label="Close"
									onClick={closeModal}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							{cloneElement(children, {
								toggleModal: closeModal
							})}
						</div>
					</div>
				</>,
				document.getElementById('modal')
		  )
		: null
}

Modal.prototype = {
	isOpen: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired
}

export default Modal
