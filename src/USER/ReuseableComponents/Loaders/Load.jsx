import load from '../../assets/load.gif';
import err from '../../assets/errgif.gif';
import noJobs from '../../assets/notfound.gif';

export default function Load({ type }) {
    let content = {
        image: load,
        message: 'Loading...',
    };

    if (type === 'err') {
        content = {
            image: err,
            message: 'An unknown error occurred. Please try again.',
        };
    } else if (type === 'nojobs') {
        content = {
            image: noJobs,
            message: 'No jobs found.',
        };
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img
                style={{
                    width: '30%',
                    margin: '1em',
                    mixBlendMode: 'multiply',
                }}
                src={content.image}
                alt="Status Indicator"
            />
            <p>{content.message}</p>
        </div>
    );
}
