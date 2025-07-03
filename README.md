Setup Instructions 

# 1. Clone the repository
git clone https://github.com/your-username/pipeline-editor.git
cd pipeline-editor

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

After running npm start, the app will be available at: http://localhost:3000


Libraries Used & Key Architectural Decisions
Core Libraries

# React:
Framework used to build a component-based, reactive UI.


# React Flow:
Powers the graph editor – rendering nodes, handling edges, and user interactions like dragging, connecting, and zooming.

# dagre:
Used for auto-layout – rearranges nodes in a clean left-to-right flow while preserving DAG constraints.

# react-icons:
Lightweight icon library for intuitive UI buttons (add, layout).

# react-tooltip:
Adds tooltips to improve usability and accessibility.



Demo link : https://pipe-line-editor-qdjs2xgh6-naveens-projects-a8157cb7.vercel.app


Screen recording link :  https://youtu.be/adnj213CrWE 


Challenges Faced & Solutions


1. Following Valid DAG Rules
Challenge: Preventing self-loops, disallowed edge directions, and cycle formations     dynamically.
Solution: 
         Implemented a custom validation service using DFS to detect cycles.

         Self-loop prevention was handled in onConnect with early checks and visual feedback via red edges.

         Enforced left-to-right (incoming/outgoing) direction using reactflow handles.


2. Auto Layout Alignment
Challenge: Manually added nodes often overlapped or cluttered the canvas.
Solution :
         Integrated dagre to auto-layout nodes using rankdir: 'LR', and applied smooth transitions with fitView().

3. Node & Edge Deletion with Keyboard
Challenge: Users expected to delete selected nodes or edges using the Delete key.
Solution :
         Added a global key listener and used onSelectionChange to track selected elements and filter them from state on keypress.
