tinymce.init({
  selector: "textarea.textarea-mce",

  height: 500,

  plugins: [
    "advlist autolink lists link charmap preview anchor",

    "searchreplace visualblocks code fullscreen",

    "insertdatetime table wordcount",

    "image",
  ],
});