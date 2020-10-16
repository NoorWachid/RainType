function EaseInOut(dx) 
{
    return dx < 0.5 ? 2 * dx * dx : -1 + (4 - 2 * dx) * dx;
}

function Interpolate(start, end, scale) {
    return (end - start) * scale + start;
}

function ScrollToNode(container, node, duration = 0)
{
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const position = {
        x: nodeRect.left - containerRect.left + container.scrollLeft,
        y: nodeRect.top - containerRect.top + container.scrollTop,
    };

    ScrollTo(container, position, duration);
}

    
function ScrollTo(node, to, duration = 0) 
{
    const start = {
        x: node.scrollLeft,
        y: node.scrollTop
    };
    const change = {
        x: to.x - start.x,
        y: to.y - start.y
    };
    const beginTimePoint = performance.now();
    let now, elapsedTime, dx;

    if (duration == 0)
    {
        node.scrollLeft = start.x + change.x;
        node.scrollTop = start.y + change.y;
        return;
    }

    const Animate = () => {
        now = performance.now();
        elapsedTime = (now - beginTimePoint) / 1000;
        dx = (elapsedTime / duration);

        const scale = EaseInOut(dx);

        node.scrollLeft = start.x + change.x * scale;
        node.scrollTop = start.y + change.y * scale;

        if (dx < 1)
            requestAnimationFrame(Animate);
    };

    Animate();
}

function MorphNode(fromNode, toNode, duration = 0)
{
    fromRect = fromNode.getBoundingClientRect();
    const GetToRect = () => toNode.getBoundingClientRect();

    const beginTimePoint = performance.now();
    let now, elapsedTime, dx;

    if (duration == 0)
    {
        fromNode.style.left   = GetToRect().x + 'px';
        fromNode.style.top    = GetToRect().y + 'px';
        fromNode.style.width  = GetToRect().width + 'px';
        fromNode.style.height = GetToRect().height + 'px';
        return;
    }

    const Animate = () => {
        now = performance.now();
        elapsedTime = (now - beginTimePoint) / 1000;
        dx = (elapsedTime / duration);

        const scale = EaseInOut(dx);

        fromNode.style.left   = Interpolate(fromRect.x, GetToRect().x, scale) + 'px';
        fromNode.style.top    = Interpolate(fromRect.y, GetToRect().y, scale) + 'px';
        fromNode.style.width  = Interpolate(fromRect.width, GetToRect().width, scale) + 'px';
        fromNode.style.height = Interpolate(fromRect.height, GetToRect().height, scale) + 'px';

        if (dx < 1)
            requestAnimationFrame(Animate);
    };

    Animate();
}

function MoveNode(node, to, duration = 0)
{
    node.style.left = to.x + 'px';
    node.style.top = to.y + 'px';
}
