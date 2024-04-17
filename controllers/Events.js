import { eventsModel } from "../models/Events.js";

export const addEvent = async (req, res) => {
  try {
    const { event, userId } = req.body;
    if (!event && !userId) {
      throw new Error("Invalid input");
    }
    await eventsModel.findOneAndUpdate(
      { userId: userId }, // Find the document with the given userId
      {
        $push: {
          event,
        },
      }, // Add the new object to the 'event' array
      { upsert: true, new: true } // Return the updated document
    );
    res.status(200).json({ success: true, message: "Event added" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
    // console.log(error);
  }
};
export const getEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const event = await eventsModel.findOne({ userId: userId });
    res.status(200).json({ success: true, event: event?event.event:[] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
    // console.log(error);
  }
};
