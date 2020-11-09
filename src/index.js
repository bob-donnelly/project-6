u// DOM selector

const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const mroe = document.getElementById('more')

// A link to an api for song lyrics

const apiURL = 'http://api.lyrics.ovh'

async function searchSongs (term) {
    const res = await fetch(`${apiURL}/suggest/${term}`)
    const data = await res.json()

    showData (data)
}

function getLyrics() {
    
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

// Event Listeners 

form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = search.nodeValue.trim()

    if(!searchTerm) {
        alert('Please input a search term')
    } else {
        searchSongs(searchTerm)
    }
})

result.addEventListener('click', e => {
    const clickEl = e.target

    if(clickEl.tagName === "BUTTON") {
        const artist = clickEl.getAttribute('data-artist')
        const songTitle = clickEl.getAttribute('data-songTitle')
    
    getLyrics(artist, songTitle)
    }
})