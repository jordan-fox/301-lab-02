'use strict';

ConstructPics.picArray = [];

// CONSTRUCTOR
function ConstructPics (hornPic) {
  this.image_url = hornPic.image_url;
  this.title = hornPic.title;
  this.description = hornPic.description;
  this.keyword = hornPic.keyword;
  this.horns = hornPic.horns;
}

// copies photo-template and connects constructed info to DOM
ConstructPics.prototype.photoTemplate = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword);
};

// Gets data from JSON, pushes it through the constructor and into an array
ConstructPics.readJson = () => {
  $.get('data/page1.json')
    .then(data => {
      data.forEach(item => {
        ConstructPics.picArray.push(new ConstructPics(item));
      });
      ConstructPics.picArray.forEach(hornPic => {
        $('main').append(hornPic.photoTemplate());
      });
    })
    .then(ConstructPics.filterImage)
    .then(ConstructPics.filterImage);
};

// renders each photo ------------
ConstructPics.loadPics = () => {
  ConstructPics.picArray.forEach(hornPic => hornPic.photoTemplate());
};

$(() => ConstructPics.readJson());

// filter images ------------------
// ConstructPics.prototype.filterImage = function() {
//   let hornOption = $('select').append('<option>text</option>');

//   let hornHtml = $('select').html();

//   hornOption.html(hornHtml);

//   hornOption.find('option').text(this.keyword)
//   hornOption.removeClass('clone');
//   hornOption.attr('class', this.keyword);
// };

// new stuff --------------

ConstructPics.filterImage = () => {
  let filterKey = [];

  $('option').not(':first').remove();

  ConstructPics.picArray.forEach(hornPic => {
    if (!filterKey.includes(hornPic.keyword)) filterKey.push(hornPic.keyword);
  });

  filterKey.sort();

  filterKey.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};




ConstructPics.handlefilter = () => {
  $('select').change(function () {
    let $selected = $(this).val();
    if ($selected !== 'default') {
      $('div').hide();

      ConstructPics.picArray.forEach(hornPic => {
        if ($selected === hornPic.keyword) {
          $(`div[class="${selected}"]`).addClass('filtered').fadeIn();
        }
      });
    }
  })
};
