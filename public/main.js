function checkGetRequest(path) {
  return new Promise((resolve, reject) => {
    $.get(path).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function tab_contents() {
  var tabs = document.querySelectorAll('.nav-link');
  var tab_pane = document.querySelectorAll('.tab-pane');

  tabs.forEach((tab, index) => {
    if (index % 2 === 0) {
      tab.addEventListener('click', () => {
        tabs[index + 1].className = tabs[index + 1].className.replace(' active', '');
        tab_pane[index + 1].className = tab_pane[index + 1].className.replace(' show active', '');
        tabs[index].className = 'nav-link active';
        tab_pane[index].className = 'tab-pane fade show active';
      });
    } else {
      tab.addEventListener('click', () => {
        tabs[index - 1].className = tabs[index - 1].className.replace(' active', '');
        tab_pane[index - 1].className = tab_pane[index - 1].className.replace(' show active', '');
        tabs[index].className = 'nav-link active';
        tab_pane[index].className = 'tab-pane fade show active';
      });
    }
  });
}

function rowCol_constructor(data) {
  var row = d3.select('body > div.container-fluid').append('div').attr('class', 'row');
  var col_3 = row.append('div').attr('class', 'col-sm-3');
  var col_4 = row.append('div').attr('class', 'col-sm-4');
  var col_5 = row.append('div').attr('class', 'col-sm-5');

  // Create Image
  col_3.append('img').attr('src', data.thumbnail).attr('class', 'img-fluid');

  // Create Title
  col_4.append('h4').html(data.shoeName);

  var nav_tabs = col_4.append('ul').attr('class', 'nav nav-tabs');

  var nav_tabs_item1 = nav_tabs
    .append('li')
    .attr('class', 'nav-item')
    .append('a')
    .attr('class', 'nav-link active')
    .attr('href', 'javascript:void(0)')
    .html('About');

  var nav_tabs_item2 = nav_tabs
    .append('li')
    .attr('class', 'nav-item')
    .append('a')
    .attr('class', 'nav-link')
    .attr('href', 'javascript:void(0)')
    .html('Details');

  var nav_content = col_4.append('div').attr('class', 'tab-content');

  var nav_content1 = nav_content
    .append('div')
    .attr('class', 'tab-pane fade show active')
    .attr('role', 'tabpanel')
    .html(data.description);

  var nav_content2 = nav_content
    .append('div')
    .attr('class', 'tab-pane fade')
    .attr('role', 'tabpanel');

  nav_content2.html(`<b>Colorway:</b> ${data.colorway}`);
}

// function tableConstructor(id) {
//   var row = d3.select('body > div.container-fluid').append('div').attr('class', 'row');
//   var table = row.append('table').attr('class', 'table');

//   $.get(`https://sneaks-api.azurewebsites.net/id/${id}/prices`).then((data) => {
//     console.log(Object.keys(data.resellPrices));
//   });
// }

async function search(url) {
  var body = document.getElementById('container');
  let p = await checkGetRequest(url);

  if (p != 'Product Not Found') {
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    p.forEach((p_data) => {
      rowCol_constructor(p_data);
    });
    tab_contents();
  } else {
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    body.append('text').text(p);
  }
}

$(() => {
  $('#form').submit((event) => {
    event.preventDefault();
    var input = $('input').val();
    var url = `https://sneaks-api.azurewebsites.net/search/${input}`;

    $.ajax({
      url: url,
      beforeSend: () => {
        $('#loading').show();
        $('.spinner-border').show();
        $('#container').hide();
      },
      complete: async () => {
        await search(url);

        $('#loading').hide();
        $('.spinner-border').hide();
        $('#container').show();
      },
    });
    return false;
  });

  var url = `https://sneaks-api.azurewebsites.net/search/yeezy`;

  $.get(url).then((data) => {
    data.forEach((d) => {
      rowCol_constructor(d);
    });

    tab_contents();

    // var $el = $('div.row');
    // var elWidth = $el.outerWidth();
    // var elWidthMargin = $el.outerWidth(true);
  });
});
