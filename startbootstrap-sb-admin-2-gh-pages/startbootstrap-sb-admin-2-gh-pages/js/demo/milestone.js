// // script.js

// document.addEventListener('DOMContentLoaded', function() {
//     const progressIndicator = document.getElementById('progress-indicator');
//     const stepInput = document.getElementById('step-input');
//     const updateProgressButton = document.getElementById('update-progress');
//     const milestones = document.querySelectorAll('.milestone');
//     const totalSteps = milestones.length;
  
//     updateProgressButton.addEventListener('click', function() {
//       const currentStep = parseInt(2, 10);
//       if (!isNaN(currentStep) && currentStep >= 1 && currentStep <= totalSteps) {
//         updateProgress(currentStep);
//       } else {
//         alert('Please enter a valid step number between 1 and ' + totalSteps);
//       }
//     });
  
//     function updateProgress(step) {
//       const percentage = (step / totalSteps) * 100;
//       progressIndicator.style.height = percentage + '%';
      
//       milestones.forEach((milestone, index) => {
//         if (index < step) {
//           milestone.classList.add('completed');
//         } else {
//           milestone.classList.remove('completed');
//         }
//       });
//     }
//   });
  
// script.js

document.addEventListener('DOMContentLoaded', function() {
    const progressIndicator = document.getElementById('progress-indicator');
    const milestones = document.querySelectorAll('.milestone');
    const totalSteps = milestones.length;
  
    const currentStep = 2; // Hardcoded step value
    if (!isNaN(currentStep) && currentStep >= 1 && currentStep <= totalSteps) {
      updateProgress(currentStep);
    } else {
      console.error('Please enter a valid step number between 1 and ' + totalSteps);
    }
  
    function updateProgress(step) {
      const percentage = (step / totalSteps) * 100;
      progressIndicator.style.height = percentage + '%';
  
      milestones.forEach((milestone, index) => {
        if (index < step) {
          milestone.classList.add('completed');
        } else {
          milestone.classList.remove('completed');
        }
      });
    }
  });
  