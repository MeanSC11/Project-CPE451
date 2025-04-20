const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// สร้างประวัติการเดินทางใหม่
exports.createTravelHistory = async (req, res) => {
  const { travelDate, startStation, endStation, travelTime } = req.body;

  try {
    const newHistory = await prisma.travelHistory.create({
      data: {
        travelDate: new Date(travelDate),
        startStation,
        endStation,
        travelTime,
      },
    });
    res.status(201).json(newHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Create failed' });
  }
};

// ดึงประวัติทั้งหมด
exports.getAllTravelHistory = async (req, res) => {
  try {
    const histories = await prisma.travelHistory.findMany({
      orderBy: { travelDate: 'desc' },
    });
    res.json(histories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
};

// ดึงประวัติตาม id
exports.getTravelHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const history = await prisma.travelHistory.findUnique({
      where: { id: parseInt(id) },
    });

    if (!history) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
};

// ลบประวัติ
exports.deleteTravelHistory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.travelHistory.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

// อัปเดตประวัติ
exports.updateTravelHistory = async (req, res) => {
  const { id } = req.params;
  const { travelDate, startStation, endStation, travelTime } = req.body;

  try {
    const updated = await prisma.travelHistory.update({
      where: { id: parseInt(id) },
      data: {
        travelDate: new Date(travelDate),
        startStation,
        endStation,
        travelTime,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};
