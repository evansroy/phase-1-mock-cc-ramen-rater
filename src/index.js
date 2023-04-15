// write your code here
// Step 1: Fetch the ramen data from the server
fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(data => {
    // Step 2: Parse the data into an array of objects
    const ramenData = data.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      rating: item.rating,
      comment: item.comment
    }));
    
    // Step 3: Create img tags for each ramen image
    const ramenMenu = document.getElementById('ramen-menu');
    ramenData.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id;
      
      // Step 5: Add event listeners to each img tag
      img.addEventListener('click', () => {
        // Step 6: Retrieve the data for the clicked ramen item
        const selectedRamen = ramenData.find(item => item.id === ramen.id);
        
        // Step 7: Populate the #ramen-detail div with the ramen info
        const ramenDetail = document.getElementById('ramen-detail');
        ramenDetail.innerHTML = `
          <img src="${selectedRamen.image}" alt="${selectedRamen.name}">
          <h2>${selectedRamen.name}</h2>
          <p>${selectedRamen.description}</p>
          <form id="comment-form">
            <label for="rating-input">Rating:</label>
            <input type="number" id="rating-input" name="rating" min="1" max="5" required>
            <label for="comment-input">Comment:</label>
            <textarea id="comment-input" name="comment" rows="4" cols="50" required></textarea>
            <button type="submit">Submit</button>
          </form>
        `;
        
        // Step 9: Add an event listener to the comment form's submit button
        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', event => {
          event.preventDefault();
          
          // Step 10: Retrieve the values from the comment form input fields
          const rating = event.target.elements['rating'].value;
          const comment = event.target.elements['comment'].value;
          
          // Step 11: Create a new object representing the new ramen item
          const newRamen = {
            id: Date.now(),
            name: selectedRamen.name,
            image: selectedRamen.image,
            description: selectedRamen.description,
            rating: parseInt(rating),
            comment: comment
          };
          
          // Step 12: Append the new object to the array of ramen objects
          ramenData.push(newRamen);
          
          // Create a new img tag for the new ramen item
          const newImg = document.createElement('img');
          newImg.src = newRamen.image;
          newImg.alt = newRamen.name;
          newImg.dataset.id = newRamen.id;
          
          // Append the new img tag to the #ramen-menu div
          ramenMenu.appendChild(newImg);
        });
      });
      
      // Append the img tag to the #ramen-menu div
      ramenMenu.appendChild(img);
    });
  });

