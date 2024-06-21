const APIKEY ='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'
async function getEmotion(text) {
      // Load tokenizer and model
      const tokenizer = await tf.auto.AutoTokenizer.fromPretrained("mrm8488/t5-base-finetuned-emotion");
      const model = await tf.auto.AutoModelWithLMHead.fromPretrained("mrm8488/t5-base-finetuned-emotion");

      // Preprocess text
      const inputIds = await tokenizer.encode(text + '</s>');
      const inputTensor = tf.tensor2d([inputIds], [1, inputIds.length]);

      // Perform inference
      const outputTensor = await model.generate(inputTensor, { max_length: 2 });

      // Decode output
      const dec = await outputTensor.array();
      const label = await tokenizer.decode(dec[0]);

      return label;
    }

    async function run() {
      // Example usage
      const text1 = "I feel as if I haven't blogged in ages or at least truly blogged I am doing an update cute";
      const emotion1 = await getEmotion(text1);
      console.log('Emotion:', emotion1); // Output: 'joy'

      const text2 = "I have a feeling I kinda lost my best friend";
      const emotion2 = await getEmotion(text2);
      console.log('Emotion:', emotion2); // Output: 'sadness'
    }

    run();