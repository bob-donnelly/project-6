u// DOM selector

const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const mroe = document.getElementById('more')

// A link to an api for song lyrics

const apiURL = 'https://api.lyrics.ovh'

async function searchSongs (term) {
    const res = await fetch(`${apiURL}/suggest/${term}`)
    const data = await res.json()

    showData (data)
}

async function getLyrics(artist, songTitle) {
    const res = await fetch (`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await res.json()

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    `
    more.innerHTML = ''
}

function showData (data) {
result.innerHTML = `
<ul class="songs">
${data.data
.map(
    song => `<li>
    <span><strong>${song.artist.name}</strong>- ${song.title}</span>
    <button class="btn" data-artist="${song.artist}" data-title="${song.title}">Get Lyrics</button>
    </li>`)
    .join('')
}
</ul>
`
if (data.prev || data.next) {
    more.innerHTML = `
    ${
        data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''
    }
    ${
        data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''
    }
    `
} else {
    more.innerHTML = ''
}
}

// prev and next buttons

async function getMoreSongs (url) {
    const res = await fetch ('https://cors-anywhere.herokuapp.com/${url}')
    const data = await res.json
    
    showData(data)
}

// Event Listeners 

//Form submit

form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = search.nodeValue.trim()

    if(!searchTerm) {
        alert('Please input a search term')
    } else {
        searchSongs(searchTerm)
    }
})

// Lyrics click button

result.addEventListener('click', e => {
    const clickEl = e.target

    if(clickEl.tagName === "BUTTON") {
        const artist = clickEl.getAttribute('data-artist')
        const songTitle = clickEl.getAttribute('data-songTitle')
    
    getLyrics(artist, songTitle)
    }
})