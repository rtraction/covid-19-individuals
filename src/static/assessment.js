// Copyright 2020 rTraction
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
$(document).ready(function() {
  // QUESTION "PAGES"
  var q0 = $("#q0"),
    q1 = $("#q1"),
    q2 = $("#q2"),
    q3 = $("#q3"),
    q4 = $("#q4"),
    q5 = $("#q5"),
    q6 = $("#q6"),
    q7 = $("#q7");

  // RESULT "PAGES"
  var generalResult = $("#generalResult"),
    cews = $("#cews"),
    fcc = $("#fcc"),
    workSharing = $("#workSharing"),
    impp = $("#impp"),
    ceba = $("#ceba"),
    bcap = $("#bcap"),
    taxAll = $("#taxAll"),
    hydro = $("#hydro");

  // ARRAYS OF QUESTION/RESULT PAGES (used to show/hide content)
  var qArray = [q0, q1, q2, q3, q4, q5, q6, q7];
  var rArray = [generalResult, cews, fcc, impp, ceba, bcap, workSharing, hydro, taxAll];

  var footer = $("footer");

  // event handlers for back and reset buttons
  $("body")
    .on("click", ".backBtn", function() {
      goBack();
    })
    .on("keypress", ".backBtn", function(e) {
      if (e.which == 13) {
        goBack();
      }
    })
    .on("click", ".resetBtn", function() {
      doReset();
    })
    .on("keypress", ".resetBtn", function(e) {
      if (e.which == 13) {
        doReset();
      }
    });

  // Tracking for mouse being in the window.
  // We are using this to differentiate between
  // in-page back button and browser buttons
  document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
  };

  document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
  };

  window.onhashchange = function() {
    if (window.innerDocClick) {
      window.innerDocClick = false;
    } else {
      goBack(window.location.hash || null);
    }
  };

  // APPLICATION FUNCTIONS
  init();

  function init() {
    // reveal the first question/buttons
    window.history.pushState(null, document.title, "#q0");
    reveal(q0);
  }

  function disable(x) {
    // hide the element on the page via fadeOut
    x.add(footer).fadeOut(200);
  }

  function reveal(x) {
    x.add(footer)
      .delay(300)
      .fadeIn();
  }

  function goBack(hash) {
    var hashEl = hash ? $(hash) : null;
    var popped = hashEl || stack.pop();

    // If we have no history we can't go back
    if (!popped) return;

    // hide all questions elements on the page
    for (var i = 0; i < qArray.length; i++) {
      disable(qArray[i]);
    }
    // hide all answers elements on the page
    for (var i = 0; i < rArray.length; i++) {
      disable(rArray[i]);
    }

    location.href = popped.selector;
    reveal(popped);
  }

  function doReset() {
    goBack("#q0");
  }

  /*
  ANSWERS - the variables are set when the according buttons are clicked.
  The set variables then reveal the according result sections if "true".
  This is done in the last question - see if clauses at bottom of script.
  */

  var stack = [],
    payroll = true,
    is_small = true,
    is_medium = true,
    is_agro = true,
    is_bank = true,
    is_nfp = true;

  // QUESTION YES/NO BUTTON ACTIONS

  // Landing page btns
  $("#launchSelfAssessment").click(function() {
    prev = q0;
    disable(q0);
    reveal(q1);
    stack.push(q0);
  });

  //Disclaimer q1 buttons
  $("#accept").click(function() {
    prev = q1;
    disable(q1);
    reveal(q2);
    stack.push(q1);
  });
  $("#no_accept").click(function() {
    prev = q1;
    disable(q1);
    stack.push(q1);
  });

  //q2 buttons
  $("#NFPno").click(function() {
    is_nfp = false;
    prev = q2;
    disable(q2);
    reveal(q3);
    stack.push(q2);
  });
  $("#NFPyes").click(function() {
    is_nfp = true;
    prev = q2;
    disable(q2);
    reveal(q4);
    stack.push(q2);
  });

  // q3 btns
  $("#businessSizeS").click(function() {
    is_small = true;
    is_medium = false;
    prev = q3;
    disable(q3);
    reveal(q4);
    stack.push(q3);
  });
  $("#businessSizeM").click(function() {
    is_medium = true;
    is_small = false;
    prev = q3;
    disable(q3);
    reveal(q4);
    stack.push(q3);
  });
  $("#businessSizeL").click(function() {
    is_small = false;
    is_medium = false;
    prev = q3;
    disable(q3);
    reveal(q5);
    stack.push(q4);
  });

  // q4 btns
  $("#payrollNo").click(function() {
    payroll = false;
    prev = q4;
    disable(q4);
    reveal(q5);
    stack.push(q4);
  });
  $("#payrollYes").click(function() {
    payroll = true;
    prev = q4;
    disable(q4);
    reveal(q5);
    stack.push(q4);
  });

  // q5 btns
  $("#bankYes").click(function() {
    is_bank = true;
    prev = q5;
    disable(q5);
    reveal(q6);
    stack.push(q5);
  });
  $("#bankNo").click(function() {
    is_bank = false;
    prev = q5;
    disable(q5);
    reveal(q6);
    stack.push(q5);
  });

  // q6 btns
  $("#agroYes").click(function() {
    is_agro = true;
    prev = q6;
    disable(q6);
    reveal(q7);
    stack.push(q6);
  });
  $("#agroNo").click(function() {
    is_agro = false;
    prev = q6;
    disable(q6);
    reveal(q7);
    stack.push(q6);
  });

  // q7 btns
  $("#revenuedropNo").click(function() {
    prev = q7;
    disable(q7);
    reveal(generalResult)
    reveal(workSharing)
    reveal(taxAll)

    //IF section to enable or disable result sections
    if ((is_small || is_nfp) && (payroll)) {
      reveal(ceba);
    }
    if (is_small || is_medium) {
      reveal(bcap);
    }
    if (is_small) {
      reveal(hydro);
    }
    if (is_agro) {
      reveal(fcc);
    }
    if (is_bank) {
      reveal(impp);
    }
    stack.push(q7);
  });
  $("#revenuedropYes").click(function() {
    prev = q7;
    disable(q7);
    reveal(cews);
    reveal(workSharing)
    reveal(taxAll)

    //IF section to enable or disable result sections
    if ((is_small || is_nfp) && (payroll)) {
      reveal(ceba);
    }
    if (is_small || is_medium) {
      reveal(bcap);
    }
    if (is_small) {
      reveal(hydro);
    }
    if (is_agro) {
      reveal(fcc);
    }
    if (is_bank) {
      reveal(impp);
    }
    stack.push(q7);
  });
});

/*
if (payroll == true) {
  reveal(nfpResult);
  window.location.replace("#nfpResult");
} else {
  reveal(generalResult);
  window.location.replace("#generalResult");
}
*/
