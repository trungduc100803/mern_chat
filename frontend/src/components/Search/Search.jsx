import { useState } from 'react'
import './Search.scss'

import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons'

function Search() {

    const [keySearch, setKeySearch] = useState('')


    const handleFocus = () => {
        const searchBack = document.querySelector('.search_back')
        const search_result = document.querySelector('.search_result')
        searchBack.style.display = 'block'
        search_result.style.display = 'block'
    }

    const handleBackSearch = () => {
        const searchBack = document.querySelector('.search_back')
        const search_result = document.querySelector('.search_result')

        searchBack.style.display = 'none'
        search_result.style.display = 'none'
    }

    const handleOnchange = (event) => {
        const search_result_change = document.querySelector('.search_result_icon')
        if (event.target.value !== "") {
            search_result_change.style.display = 'block'
            setKeySearch(event.target.value)
        } else {
            search_result_change.style.display = 'none'
            setKeySearch('')
        }
    }


    return <div className="Search">
        <ArrowLeftOutlined onClick={handleBackSearch} className='search_back' />
        <div className="Search_main">
            <SearchOutlined className='search_icon' />
            <input
                onChange={event => handleOnchange(event)}
                onFocus={handleFocus}
                type="text"
                placeholder='Tìm kiếm trên Mern chat'
                className='search_input'
            />

        </div>
        <div className="search_result">
            <div className="search_result_icon">
                <SearchOutlined className='search_icon' />
                <span>Tìm tin nhắn chứa "<span>{keySearch}</span>"</span>
            </div>
        </div>
    </div>
}

export default Search;