const getProjects = (req, res) => {
    // Use a dummy user ID for testing
    const userId = 1; // Replace with a valid user ID for actual use

    req.db.query('SELECT * FROM projects WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const createProject = (req, res) => {
    const { name, description, due_date } = req.body;
    // Use a dummy user ID for testing
    const userId = 1; // Replace with a valid user ID for actual use

    if (!name || !due_date) {
        return res.status(400).json({ error: 'Name and due_date are required' });
    }

    req.db.query(
        'INSERT INTO projects (name, description, due_date, user_id) VALUES (?, ?, ?, ?)',
        [name, description, due_date, userId],
        (err, result) => {
            if (err) {
                console.error('Database insertion error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ id: result.insertId, name, description, due_date });
        }
    );
};

const getProjectById = (req, res) => {
    const projectId = req.params.id;

    if (!projectId) {
        return res.status(400).json({ error: 'Project ID is required' });
    }

    req.db.query(
        'SELECT * FROM projects WHERE id = ?',
        [projectId],
        (err, results) => {
            if (err) {
                console.error('Database retrieval error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.status(200).json(results[0]);
        }
    );
};

// Add this route to your Express app
app.get('/projects/:id', getProjectById);


const updateProject = (req, res) => {
    const { id } = req.params;
    const { name, description, due_date } = req.body;

    req.db.query(
        'UPDATE projects SET name = ?, description = ?, due_date = ? WHERE id = ?',
        [name, description, due_date, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Project updated successfully' });
        }
    );
};

const deleteProject = (req, res) => {
    const { id } = req.params;

    req.db.query('DELETE FROM projects WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Project deleted successfully' });
    });
};

const addTask = (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    req.db.query(
        'INSERT INTO tasks (name, description, status, project_id) VALUES (?, ?, ?, ?)',
        [name, description, status, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, description, status });
        }
    );
};

const getTasks = (req, res) => {
    const { id } = req.params;

    req.db.query('SELECT * FROM tasks WHERE project_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;

    req.db.query(
        'UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?',
        [name, description, status, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Task updated successfully' });
        }
    );
};

const deleteTask = (req, res) => {
    const { id } = req.params;

    req.db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task deleted successfully' });
    });
};

const filterProjects = (req, res) => {
    // Use a dummy user ID for testing
    const userId = 1; // Replace with a valid user ID for actual use
    const { name, due_date, task_count } = req.query;
    let query = 'SELECT * FROM projects WHERE user_id = ?';
    const params = [userId];

    if (name) {
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (due_date) {
        query += ' AND due_date = ?';
        params.push(due_date);
    }
    if (task_count) {
        query += ` AND (SELECT COUNT(*) FROM tasks WHERE project_id = projects.id) = ?`;
        params.push(task_count);
    }

    req.db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    filterProjects
};
