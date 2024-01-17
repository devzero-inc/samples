import React from 'react';
import Tree from 'react-d3-tree';
import orgChart from '../org-chart.json';
import { useCenteredTree } from './helper';
import CloseIcon from '@mui/icons-material/Close';

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
        <circle r="15" strokeWidth="1" onClick={toggleNode} fill='#cbd5e1' />
        <text fill="white" stroke='white' strokeWidth="0.2" x="30" y="-5">
            {nodeDatum.name}
        </text>
        {nodeDatum.position &&
            <text fill="white" strokeWidth="0" x="30" y="15">
                {nodeDatum.position}
            </text>
        }
        {/* {nodeDatum.attributes?.department && (
            <text fill="black" x="20" strokeWidth="1">
                {nodeDatum.attributes?.department}
            </text>
        )} */}
    </g>
);

const TreeCont = ({ setShowTree }) => {

    const [dimensions, translate, containerRef] = useCenteredTree();

    const styles = {
        width: '100%',
        height: '100%',
        backgroundColor: '#5B30AB',
        borderRadius: '1.5rem',
    }

    return (
        <div
            // className={` z-20 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
            //             transition-all duration-300 ease-in-out overflow-hidden`}
            id="treeWrapper"
            style={styles}
            ref={containerRef}
            className='relative '
        >
            <div
                // style={{ backgroundColor: '#7251CC' }}
                className='absolute top-5 right-5 rounded-full p-3 cursor-pointer
                 bg-slate-300 hover:bg-slate-50 transition-all duration-300 ease-in-out'
                onClick={() => setShowTree(false)}
            >
                <CloseIcon style={{ color: '#5B30AB' }} />
            </div>
            <Tree
                data={orgChart}
                dimensions={dimensions}
                translate={translate}
                orientation='vertical'
                renderCustomNodeElement={renderRectSvgNode}
                separation={{ siblings: 2, nonSiblings: 3 }}

            />
        </div>
    )
}

export default TreeCont
