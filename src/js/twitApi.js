class TwitApi {
    API_BASE_URL = './twitter-proxy.php'

    constructor() {
        this.setupListener()
    }

    setupListener = () => {
        const form = document.querySelector('form[name="search_tweets"]')
        form.addEventListener('submit', this.handleSearch)
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....')

        const term = document.querySelector('input[name="term"]').value


        const data = {
            op: 'search_tweets',
            q: term,
        }

        axios.get(this.API_BASE_URL, { params: data }).then(this.processResults)
    }

    processResults = (data) => {
        const results = data.data
        console.log('got data: ', results.statuses)
        for (let z = 0; z < results.statuses.length; z++) {
            console.log(z, "; ", results.statuses[z])

            let resultsUl = document.querySelector('.result_list')
            let resLi = document.createElement('li')
            resLi.classList.add('res_li')
            let resDiv = document.createElement('a')
            resDiv.classList.add('res_div')
            let resDivInfo = document.createElement('div')
            resDivInfo.classList.add('res_div-info')
            let resDivHeader = document.createElement('h2')
            resDivHeader.classList.add('res_div-head')
            let resDivDigit = document.createElement('p')
            resDivDigit.classList.add('res_div-contact')
            let resDivAddy = document.createElement('p')
            resDivAddy.classList.add('res_div-address')
            let resDivStats = document.createElement('article')
            resDivStats.classList.add('res_div-stats')
            let resPrice = document.createElement('span')
            resPrice.classList.add('res_stats-price')
            let resRate = document.createElement('span')
            resRate.classList.add('res_stats-rate')
            let resDist = document.createElement('span')
            resDist.classList.add('res_stats-dist')
            let resImg = document.createElement('img')
            resImg.classList.add('res_div-img')

            resultsUl.appendChild(resLi)
            resLi.appendChild(resDiv)
            resDiv.appendChild(resDivInfo)
            resDivInfo.appendChild(resDivHeader)
            resDivInfo.appendChild(resDivDigit)
            resDivInfo.appendChild(resDivAddy)
            resDivInfo.appendChild(resDivStats)
            resDivStats.appendChild(resPrice)
            resDivStats.appendChild(resRate)
            resDivStats.appendChild(resDist)
            resDiv.appendChild(resImg)

            resDivHeader.textContent = results.statuses[z].user.name
            resDiv.target = "_blank"
            resDiv.href = results.statuses[z].user.url
            resDivDigit.textContent = results.statuses[z].text
            // resDivAddy.textContent = results.statuses[z].location.address1 + ", " + results.statuses[z].location.address2 + ", " + results.statuses[z].location.city + ", " + results.statuses[z].location.zip_code
            // resPrice.textContent = results.statuses[z].price
            resImg.src = results.statuses[z].user.profile_image_url_https
        }
    }

    handleError = (evt) => {
        console.log('ERROR ', err)
    }

}