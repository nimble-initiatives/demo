<script lang="ts">
  let responseMessage = ""; // For showing response from the API
  export let documentId = ""; // The ID of the document, customize this as needed.

  let feedbackForm = false;

  // Function to handle the API call for either like or dislike
  async function postCounter(counterName: string) {
    try {
      const response = await fetch("/api/postLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: documentId, // The ID of the document for which you are posting a like or dislike
          counterName: counterName, // Either 'likes' or 'dislikes'
        }),
      });
      const result = await response.json();
      if (result.success) {
        // Show feedback form if dislike was clicked
        if (counterName === "dislikes") {
          responseMessage = "";
          feedbackForm = true;
        } else {
          responseMessage = "Vad bra att informationen hjälpte dig!";
        }
      } else {
        responseMessage = `Error: ${result.message}`;
      }
    } catch (error) {
      responseMessage = `Error: ${error.message}`;
    }
  }

  async function postComment(event: SubmitEvent) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const comment = formData.get('comment') as string;
      const reason = formData.get('reason') as string;

      //console.log(comment, reason);

      const response = await fetch("/api/feedback/postComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: documentId, // The ID of the document for which you are posting a like or dislike
          comment: comment, // The comment to post
          reason: reason, // The reason for the comment
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Kommentar skickad.");
        //responseMessage = `Kommentar skickad.`;
        //window.feedback.style.display = "none";
      } else {
        //responseMessage = `Error: ${result.message}`;
      }
    } catch (error) {
      //responseMessage = `Error: ${error.message}`;
    }
  }
</script>

<!-- Component UI -->
<div class="bg-light my-4 p-5 md:p-8 rounded-sm">
  {#if responseMessage === ""}
    <div class="md:flex justify-between items-center gap-8 max-w-fit">
      <div>
        <h2 class="text-lg md:text-xl font-bold">Hjälpte den här informationen dig?</h2>
        <p class="text-accent7 mt-2">Ditt svar hjälper oss att förbättra vår hemsida.</p>
      </div>

      <div class="flex gap-2">
        <button
          on:click={() => postCounter("likes")}
          class="inline-flex items-center rounded-md bg-zinc-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
        Ja
        </button>
        <button
          on:click={() => postCounter("dislikes")}
          class="inline-flex items-center rounded-md bg-zinc-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
          Nej
        </button>
      </div>
    </div>
  {:else}
    <div class="">
      <h3 class="text-lg md:text-xl font-bold font-sans">Tack!</h3>
      <p class="mt-2">{responseMessage}</p>
    </div>
  {/if}
</div>

<form class="bg-light my-4 py-7 px-10 rounded-sm font-sans {!feedbackForm ? 'hidden' : 'block'}" id="feedback">
  <fieldset>
    <legend class="font-sans text-xl font-black text-accent7">
      Beskriv så tydligt som möjligt varför informationen inte hjälpte dig
    </legend>
    <p class="text-base my-4 text-accent7">
      Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor
      id nibh ultricies vehicula ut id elit.
    </p>
    <fieldset class="my-4">
      <legend class="font-sans text-md font-black text-accent7">Informationen var</legend>
      <div class="flex gap-4 font-serif">
        <label><input type="radio" name="reason" value="otillräcklig" /> Otillräcklig</label>
        <label><input type="radio" name="reason" value="svårt att förstå" /> Svårt att förstå</label>
        <label><input type="radio" name="reason" value="annat" /> Annat</label>
      </div>
    </fieldset>
    <div>
      <div>
        <label for="comment" class="inline-block font-black my-2 text-accent7">
          Din kommentar hjälper oss att göra webbplatsen bättre
        </label>
      </div>
      <textarea id="comment" rows="4" class="w-full resize-none border border-[#C5C5C5] rounded-sm p-2"></textarea>
    </div>
    <footer class="mt-2">
      <menu class="flex justify-end gap-4">
        <button type="reset" class="text-accent7 font-sans" on:click={() => (feedbackForm = false)}> Avbryt </button>
        <button
          class="leading-none font-bold font-sans p-1.5 rounded-full inline-flex items-center h-12 antialiased bg-secondary text-black"
        >
          <span class="px-4">Skicka</span>
          <span class="h-full aspect-square rounded-full flex items-center justify-center bg-white text-dark">
            Dislike
          </span>
        </button>
      </menu>
    </footer>
  </fieldset>
</form>
