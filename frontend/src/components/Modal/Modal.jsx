import { useEffect } from 'react';
import './Modal.scss'
import { innerModal } from './configModal';

function Modal({ visibleModal, setVisibleModal, inner, option }) {


    window.addEventListener('click', (event) => {
        if (setVisibleModal !== undefined) {
            if (event.target.className === 'modal active') {
                setVisibleModal(false)
            }
        }
    })


    return <div className={visibleModal ? 'modal active' : 'modal'}>
        <div className="modal_inner">
            {
                innerModal.map((i) => {
                    if (i.type === inner) {
                        const Inner = i.inner
                        return <Inner onclickExit={option} key={i.type} setVisibleModal={setVisibleModal} />
                    }
                })
            }
        </div>
    </div>
}

export default Modal;