
const button = document.querySelectorAll('.kid__details'),
      modal = document.querySelector('.modal'),
      modalInner = document.querySelector('.inner-modal');

      //Function to handle buttons
      function handleButtonClick( e ){
        console.log(e.currentTarget);
        const kid = e.currentTarget,
              nickname = kid.dataset.nickname,
              age = kid.dataset.age,
              birthday = kid.dataset.birthday,
              hobbies = kid.dataset.hobbies,
              photo = kid.closest('.kid').querySelector('img').src;
        console.log(photo);

        modalInner.querySelector('.modal__photo').innerHTML = `<img src="${photo}" />`;

        modalInner.querySelector('.modal__nickname').append(nickname);

        modalInner.querySelector('.modal__age').append(age);
        modalInner.querySelector('.modal__birthday').append(birthday);
        modalInner.querySelector('.modal__hobbies').append(hobbies);

        modal.classList.add('open');
      }

      // Remove Modal
      function closeModal() {
        modal.classList.remove("open");
      }

      // Adding callback to buttons
      button.forEach(btn => {
          btn.addEventListener("click", handleButtonClick);
      });

      // Adding event listener to Modal to handle close method
      modal.addEventListener("click", event => {
          const isOutside = !event.target.closest('.inner-modal');

          if (isOutside){
              closeModal();
          }
      });

      // Handle ESC key
      window.addEventListener("keydown", e => {
          if ( e.key === "Escape" ){
              closeModal();
          }
      });