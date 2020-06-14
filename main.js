"use strict"

//code for scrolling to the chosen section
var navMenuAnchors = document.querySelectorAll(".nav-menu a")
var interval

function scrollVertically(targetSection) {
  var targetSectionCoordinates = targetSection.getBoundingClientRect()
  if (targetSectionCoordinates.top <= 0) {
    clearInterval(interval)
    return
  }
  window.scrollBy(0, 50)
}

for (let i = 0; i < navMenuAnchors.length; i++) {
  navMenuAnchors[i].addEventListener("click", function (event) {
    event.preventDefault()
    var targetSectionId = this.textContent.trim().toLowerCase()
    var targetSection = document.getElementById(targetSectionId)

    interval = setInterval(scrollVertically, 20, targetSection)
  })
}

//code for fill skill bars animation
// var skillBars = document.querySelectorAll(".skill-progress div")
// var skillsContainer = document.getElementById("skills-container")
// var animationDone = false

// function initializeBars() {
//   for (let bar of skillBars) {
//     bar.style.width = 0 + "%"
//   }
// }
// initializeBars()

// function fillBars() {
//   for (let bar of skillBars) {
//     let barWidth = bar.getAttribute("data-bar-width")
//     let currWidth = 0
//     let interval = setInterval(function () {
//       if (currWidth > barWidth) {
//         clearInterval(interval)
//         return
//       }
//       currWidth++
//       bar.style.width = currWidth + "%"
//     }, 6)
//   }
// }

// var scrollToTheContainer = () => {
//   var coordinates = skillsContainer.getBoundingClientRect()

//   if (!animationDone && coordinates.top < window.innerHeight) {
//     animationDone = true
//     fillBars()
//   } else if (coordinates.top > window.innerHeight) {
//     animationDone = false
//     initializeBars()
//   }
// }
// window.addEventListener("scroll", scrollToTheContainer)

// code for fill skill bars animation individually
var progressBars = document.querySelectorAll(".skill-progress > div")
var barVisited = []

function initialiseBar(i) {
  barVisited[i] = false
  progressBars[i].style.width = 0 + "%"
}

for (let i = 0; i < progressBars.length; i++) {
  initialiseBar(i)
}

function fillBar(bar) {
  let currentWidth = 0
  let targetWidth = bar.getAttribute("data-bar-width")
  let interval = setInterval(function () {
    if (currentWidth >= targetWidth) {
      clearInterval(interval)
      return
    }
    currentWidth++
    bar.style.width = currentWidth + "%"
  }, 5)
}

function checkScroll() {
  for (let i = 0; i < progressBars.length; i++) {
    let barCoordinates = progressBars[i].getBoundingClientRect()
    if (!barVisited[i] && barCoordinates.top <= window.innerHeight) {
      barVisited[i] = true
      fillBar(progressBars[i])
    } else if (barCoordinates.top > window.innerHeight) {
      barVisited[i] = false
      initialiseBar(i)
    }
  }
}
window.addEventListener("scroll", checkScroll)
